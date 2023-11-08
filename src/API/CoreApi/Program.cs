using Application;
using CoreApi;
using CoreApi.Identity;
using Infrastructure;

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

app.UseCors(opt =>
{
    opt.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});
//app.UseCors("angular");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
