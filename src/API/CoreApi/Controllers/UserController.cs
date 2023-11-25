using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CoreApi.Controllers;

[Authorize] public class UserController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet, Route("favorites")]
    public async Task<IEnumerable<Sight>> GetMyFavorites()
    {
        var hasUserId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!hasUserId) return Array.Empty<Sight>();

        var user = await _context.Users
            .Include(u=>u.FavoriteSights).ThenInclude(s=>s.SightPhotos)
            .FirstOrDefaultAsync(u=>u.Id == userId);
        if (user is null) return Array.Empty<Sight>();

        return user.FavoriteSights;
    }
}
