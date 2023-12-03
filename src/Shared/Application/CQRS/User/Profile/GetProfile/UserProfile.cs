using Domain.Entities;

namespace Application.CQRS.User.Profile.GetProfile;
public class UserProfile
{
    public string Email { get; set; }
    public UserAvatar Avatar { get; set; }
}
