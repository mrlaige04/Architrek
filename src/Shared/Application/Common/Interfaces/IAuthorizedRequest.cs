using System.Security.Claims;

namespace Application.Common.Interfaces;
public interface IAuthorizedRequest<out TResponse> : IRequest<TResponse>
{
    public ClaimsPrincipal? User { get; set; }
}

public static class AuthorizedRequestExtensions
{
    public static IAuthorizedRequest<T> WithUser<T>(this IAuthorizedRequest<T> request, ClaimsPrincipal? user)
    {
        request.User = user;
        return request;
    }
}