using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;
public class ApplicationUser : IdentityUser<Guid>
{
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpires { get; set; }

    public ICollection<SightReview> Reviews { get; set; }
}
