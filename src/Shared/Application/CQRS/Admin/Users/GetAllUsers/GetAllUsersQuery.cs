using Application.Common.Models;
using Application.Identity;

namespace Application.CQRS.Admin.Users.GetAllUsers;
public record GetAllUsersQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<ApplicationUser>>;
