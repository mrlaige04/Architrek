using Application.Common.Models;

namespace Application.CQRS.Admin.Users.DeleteUser;
public record DeleteUserCommand(Guid Id) : IRequest<Result>;