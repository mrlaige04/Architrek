using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;
public class ApplicationUser : IdentityUser<Guid>
{
    public ICollection<Review> Reviews { get; set; }
}
