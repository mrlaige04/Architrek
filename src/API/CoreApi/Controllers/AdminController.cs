using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Admin.Categories.CreateCategoryCommand;
using Domain.Constants;
using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IEnumerable<ApplicationUser>> GetUsers()
    {
        return await _userManager.Users.Include(u=>u.Avatar).ToListAsync();
    }

    [HttpGet, Route("categories")]
    public async Task<IEnumerable<Category>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    [HttpDelete, Route("users/{id:guid}")]
    public async Task<bool> DeleteUser(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null) return false;
        return !IsSuperAdmin(user) && (await _userManager.DeleteAsync(user)).Succeeded;
    }

    [HttpGet, Route("isAdmin"), AllowAnonymous]
    public async Task<bool> IsAdmin()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return false;

        return await _userManager.IsInRoleAsync(user, Roles.Administrator);
    }

    [HttpPost, Route("category")]
    public async Task<Result> CreateCategoryAsync([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);

    [HttpDelete, Route("category/{id:guid}")]
    public async Task<Result> DeleteCategory(Guid id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (category is null) return Result.Failure("Not found");

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync(CancellationToken.None);
        return Result.Success();
    }

    private bool IsSuperAdmin(ApplicationUser user)
    {
        var email = _configuration["admin:prebuilt:email"];
        return email == user.Email;
    }
}
