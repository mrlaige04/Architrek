using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.Identity;

namespace Application.CQRS.Admin.Users.GetAllUsers;
public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, PaginatedList<ApplicationUser>>
{
    private readonly IApplicationDbContext _context;

    public GetAllUsersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<ApplicationUser>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        return await _context.Users.PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
