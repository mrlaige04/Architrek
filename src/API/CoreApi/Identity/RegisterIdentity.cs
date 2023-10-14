using Domain.Constants;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;

namespace CoreApi.Identity;

public static class RegisterIdentity
{
    public static IServiceCollection AddIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentityApiEndpoints<ApplicationUser>(opt =>
        {
            opt.ClaimsIdentity.UserIdClaimType = JwtRegisteredClaimNames.NameId;
            opt.ClaimsIdentity.UserNameClaimType = JwtRegisteredClaimNames.Name;
            opt.ClaimsIdentity.EmailClaimType = JwtRegisteredClaimNames.Email;
            opt.ClaimsIdentity.RoleClaimType = ClaimTypes.Role;
            
        })
            .AddRoles<IdentityRole<Guid>>()
            .AddRoleManager<RoleManager<IdentityRole<Guid>>>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddAuthorizationBuilder()
            .AddPolicy("admin", cfg =>
            {
                cfg.RequireRole(Roles.Administrator);
            });

        return services;
    }

    public static async Task<IApplicationBuilder> IdentityInitialize(this IApplicationBuilder app)
    {
        var sp = app.ApplicationServices.CreateScope();

        var roleManager = sp.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

        var rolesType = typeof(Roles);
        var roles = rolesType.GetFields(
            BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy
            )
            .Where(b => b.FieldType == typeof(string) )
            .ToList();

        foreach (var role in roles)
        {
            var roleName = role.GetRawConstantValue()!.ToString();
            if (!string.IsNullOrEmpty(roleName))
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
                }
            }
        }

        return app;
    }
}