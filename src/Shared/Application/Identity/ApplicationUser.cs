using Application.Common.Models;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.Identity;
public class ApplicationUser : IdentityUser<Guid>
{
    public UserAvatar Avatar { get; set; }
    public Guid AvatarId { get; set; }

    public ICollection<UserFavoriteSight> FavoriteSights { get; set; }

    public ICollection<SightReview> Reviews { get; set; }
}
