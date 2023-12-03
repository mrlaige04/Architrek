using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using Elasticsearch.Net;
using Infrastructure.Data;
using Infrastructure.Data.Interceptors;
using Infrastructure.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;

namespace Infrastructure;

public static class RegisterServices
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var dbConnectionString = configuration.GetConnectionString("Database");
        Guard.Against.Null(dbConnectionString, message: "Connection string 'Database' not found.");

        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

            options.UseNpgsql(dbConnectionString);
        });

        

        services.AddSingleton<ElasticClient>(opt =>
        {
            var elasticConnectionString = configuration.GetConnectionString("Elastic");
            Guard.Against.Null(elasticConnectionString, message: "Connection string 'Elastic' not found");

            var connectionPool = new SingleNodeConnectionPool(new Uri(elasticConnectionString, UriKind.Absolute));

            var settings = new ConnectionSettings(connectionPool);
            var elasticClient = new ElasticClient(settings);

            return elasticClient;
        });

        services.AddSingleton<IElasticSearchService, ElasticSearchService>();

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());



        services.AddTransient<IIdentityService, IdentityService>();
        return services;
    }
}