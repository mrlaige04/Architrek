using Application.Identity;
using Ardalis.GuardClauses;
using Domain.Constants;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace CoreApi.Identity;

public static class RegisterIdentity
{
    public static IServiceCollection AddIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtOptions = configuration.GetSection("JwtOptions")
            .Get<JwtOptions>();

        Guard.Against.Null(jwtOptions, message: "JwtOptions are not set");

        services.AddSingleton<JwtOptions>(jwtOptions);

        services.AddAuthentication()
            .AddJwtBearer(IdentityConstants.BearerScheme, opt =>
            {
                byte[] signingKeyBytes = Encoding.UTF8.GetBytes(jwtOptions.SigningKey);

                opt.SaveToken = true;
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtOptions.Issuer,
                    ValidAudience = jwtOptions.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(signingKeyBytes)
                };
            });


        

        services
            .AddIdentityCore<ApplicationUser>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireNonAlphanumeric = false;

                opt.Tokens.EmailConfirmationTokenProvider = "SixDigitUserTokenProvider";

                opt.ClaimsIdentity.UserIdClaimType = JwtRegisteredClaimNames.NameId;
                opt.ClaimsIdentity.UserNameClaimType = JwtRegisteredClaimNames.Name;
                opt.ClaimsIdentity.EmailClaimType = JwtRegisteredClaimNames.Email;
                opt.ClaimsIdentity.RoleClaimType = ClaimTypes.Role;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddDefaultTokenProviders()
            .AddEntityFrameworkStores<ApplicationDbContext>();
        
        services.AddAuthorizationBuilder()
            .AddPolicy("admin", cfg =>
            {
                cfg.RequireRole(Roles.Administrator);
            });

        services.AddTransient<TokenService>();
        
        return services;
    }
    public static IServiceCollection AddIntegratedIdentity<TUser>(this IServiceCollection services) where TUser: IdentityUser<Guid>, new()
    {
        services.AddIdentityApiEndpoints<ApplicationUser>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
            opt.Password.RequireDigit = true;
            opt.Password.RequireLowercase = true;
            opt.Password.RequireUppercase = true;
            opt.Password.RequireNonAlphanumeric = false;
            opt.SignIn.RequireConfirmedAccount = false;
            opt.SignIn.RequireConfirmedPhoneNumber = false;
            opt.SignIn.RequireConfirmedEmail = true;

            opt.ClaimsIdentity.RoleClaimType = ClaimTypes.Role;
        })
            .AddRoles<IdentityRole<Guid>>()
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

        await CreateDefaultAdmin(sp.ServiceProvider);

        return app;
    }


    public static async Task CreateDefaultAdmin(IServiceProvider sp)
    {
        var userManager = sp.GetRequiredService<UserManager<ApplicationUser>>();
        var config = sp.GetRequiredService<IConfiguration>();

        var email = config["admin:prebuilt:email"];
        var password = config["admin:prebuilt:password"];

        Guard.Against.Null(email, message: "Admin email must be set");
        Guard.Against.Null(password, message: "Admin password must be set");

        var user = await userManager.FindByEmailAsync(email);
        if (user != null && await userManager.IsInRoleAsync(user, Roles.Administrator)) return;

        var newUser = new ApplicationUser
        {
            Email = email,
            UserName = email,
            EmailConfirmed = true,
        };
        
        var createUserResult = await userManager.CreateAsync(newUser, password);
        var addToRoleResult = await userManager.AddToRoleAsync(newUser, Roles.Administrator);

        if (!createUserResult.Succeeded || !addToRoleResult.Succeeded) Guard.Against.Null(newUser, "Admin must be set");
    }
}