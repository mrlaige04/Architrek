using Application;
using CoreApi;
using CoreApi.Identity;
using Infrastructure;
using Infrastructure.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddWebUI();
builder.Services.AddIdentity(builder.Configuration);

var app = builder.Build();
await app.IdentityInitialize();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("Identity").MapIdentityApi<ApplicationUser>();
app.MapControllers();

app.Run();
