using Application.Identity;
using Domain.Common;
using Domain.Entities;

namespace Application.Common.Models;
public class UserFavoriteSight : BaseAuditableEntity
{
    public ApplicationUser User { get; set; }
    public Guid UserId { get; set; }

    public Sight Sight { get; set; }
    public Guid SightId { get; set; }
}