using Domain.Constants;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class HomeController : ApiControllerBase
{
    [HttpPost, Route("setrole")]
    public async Task<IActionResult> SetRole
        ([FromServices] UserManager<ApplicationUser> roleManager)
    {
        var user = await roleManager.GetUserAsync(User);
        var res = await roleManager.AddToRoleAsync(user, Roles.Administrator);

        return Ok();
    
    
    }

    [HttpGet, Authorize("admin"), Route("admiin")]
    public async Task<IActionResult> ADmin()
    {
        var user = User;
        return Ok(); 
    }
}
