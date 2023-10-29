using Application.Common.Interfaces;
using CoreApi.Services;
using CoreApi.Services.Interceptors;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.ComponentModel.DataAnnotations;

namespace CoreApi;

public static class RegisterServices
{
    public static IServiceCollection AddWebUI(this IServiceCollection services)
    {
        services.AddScoped<IUser, CurrentUser>();
        services.AddHttpContextAccessor();
       
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddControllers();

        services.AddScoped<EmailAddressAttribute>();

        services.AddTransient<IEmailMessageInterceptors, FixAbsoluteUriEmailMessageInterceptor>();

        services.AddTransient<IEmailSender, CustomEmailSender>();

        services.AddCors(opt =>
        {
            opt.AddPolicy("angular", pol =>
            {
                pol.WithOrigins("https://localhost:4200/")
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .SetIsOriginAllowed(pol => true);
            });
        });

        return services;
    }
}
