using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Countries.GetAllCountries;
public class GetAllCountriesQueryHandler : IRequestHandler<GetAllCountriesQuery, PaginatedList<Country>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCountriesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<Country>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Countries.PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
