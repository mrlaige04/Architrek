using Application.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class IdentityController(
    UserManager<ApplicationUser> userManager
        ) : ApiControllerBase
{
    [HttpGet, Route("emailAvailable")] public async Task<bool> EmailIsAvailable([FromQuery] string email)
        => (await userManager.FindByEmailAsync(email)) == null;
}
