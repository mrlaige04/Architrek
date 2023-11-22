using Application.Common.Interfaces;
using CoreApi.Services;
using CoreApi.Services.Interceptors;
using Microsoft.AspNetCore.Http.Features;
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
        services.AddControllers().AddNewtonsoftJson(
            opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        ); 

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

        services.Configure<FormOptions>(f =>
        {
            f.ValueLengthLimit = int.MaxValue;
            f.MultipartBodyLengthLimit = int.MaxValue;
            f.MemoryBufferThreshold = int.MaxValue;
        });

        return services;
    }
}
