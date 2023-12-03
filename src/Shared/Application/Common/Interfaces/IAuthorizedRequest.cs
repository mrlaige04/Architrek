using System.Security.Claims;

namespace Application.Common.Interfaces;
public interface IAuthorizedRequest<out TResponse> : IRequest<TResponse>
{
    public ClaimsPrincipal? User { get; set; }
}
