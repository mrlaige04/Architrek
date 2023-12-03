using Application.Common.Interfaces;
using System.Security.Claims;

namespace Application.CQRS.Admin.IsAdmin;
public record IsAdminQuery : IAuthorizedRequest<bool>
{
    public ClaimsPrincipal? User { get; set ; }
}
