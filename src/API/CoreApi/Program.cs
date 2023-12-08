using Application;
using Application.Identity;
using CoreApi;
using CoreApi.Identity;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddWebUI();

builder.Services.AddIntegratedIdentity<ApplicationUser>();

var app = builder.Build();
await app.IdentityInitialize();


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("angular");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app
    .MapGroup("api/Identity")
    .MapIdentityApi<ApplicationUser>();

app.Run();
