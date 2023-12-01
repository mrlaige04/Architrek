using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.CQRS.Admin.Categories.CreateCategoryCommand;
using Application.CQRS.Admin.Categories.DeleteCategory;
using Application.CQRS.Admin.Countries.CreateCountry;
using Application.CQRS.Admin.Countries.DeleteCountry;
using Application.CQRS.Admin.Countries.GetAllCountries;
using Application.CQRS.Admin.Sights.CreateSightCommand;
using Application.CQRS.Admin.Users.DeleteUser;
using Application.CQRS.Admin.Users.GetAllUsers;
using Application.CQRS.Categories.GetAllCategories;
using Application.Identity;
using Domain.Constants;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Result = Application.Common.Models.Result;

namespace CoreApi.Controllers;

[Authorize("admin")]
public class AdminController : ApiControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IApplicationDbContext _context;

    public AdminController(
        UserManager<ApplicationUser> userManager, 
        IConfiguration configuration,
        IApplicationDbContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }


    [HttpGet, Route("users")]
    public async Task<PaginatedList<ApplicationUser>> GetAllUsers([FromQuery] GetAllUsersQuery query)
        => await Mediator.Send(query);

    [HttpDelete, Route("users/{Id:guid}")]
    public async Task<Result> DeleteUser([FromRoute] DeleteUserCommand command)
        => await Mediator.Send(command);



    [HttpPost, Route("categories")]
    public async Task<Result> CreateCategory([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);
    
    [HttpDelete, Route("categories/{Id:guid}")]
    public async Task<Result> DeleteCategory([FromRoute] DeleteCategoryCommand command)
        => await Mediator.Send(command);

    /*[HttpGet, Route("categories")]
    public async Task<IEnumerable<Category>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }*/


    /*[HttpDelete, Route("users/{id:guid}")]
    public async Task<bool> DeleteUser(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return false;
        return !IsSuperAdmin(user) && (await _userManager.DeleteAsync(user)).Succeeded;
    }*/

    [HttpGet, Route("isAdmin"), AllowAnonymous]
    public async Task<bool> IsAdmin()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return false;

        return await _userManager.IsInRoleAsync(user, Roles.Administrator);
    }

    

    

    [HttpPost, Route("sights")]
    public async Task<Result> CreateSight([FromBody] CreateSightCommand command)
        => await Mediator.Send(command);

    [HttpDelete, Route("sights/{id:guid}")]
    public async Task<Result> DeleteSight(Guid id)
    {
        var sight = await _context.Sights.FirstOrDefaultAsync(s => s.Id == id);
        if (sight == null) return Result.Failure("Not found");

        _context.Sights.Remove(sight);
        await _context.SaveChangesAsync(CancellationToken.None);

        return Result.Success();
    }

    private bool IsSuperAdmin(ApplicationUser user)
    {
        var email = _configuration["admin:prebuilt:email"];
        return email == user.Email;
    }



    [HttpGet, Route("countries")]
    public async Task<PaginatedList<Country>> GetAllCountries([FromQuery] GetAllCountriesQuery query)
        => await Mediator.Send(query);

    [HttpPost, Route("countries")]
    public async Task<Result> CreateCountry([FromBody] CreateCountryCommand command)
        => await Mediator.Send(command);

    [HttpDelete, Route("countries/{Id:guid}")]
    public async Task<Result> DeleteCountry([FromRoute] DeleteCountryCommand command)
        => await Mediator.Send(command);
}
