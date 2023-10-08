using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CQRS.Countries.Queries;
public class GetCountryInfoById : IRequest<Country?>
{
    public Guid Id { get; set; }
}

public class GetCountryInfoByIdHandler : IRequestHandler<GetCountryInfoById, Country?>
{
    private readonly IApplicationDbContext _context;

    public GetCountryInfoByIdHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Country?> Handle(GetCountryInfoById request, CancellationToken cancellationToken)
    {
        return await _context.Countries
            .FirstOrDefaultAsync(c=>c.Id ==  request.Id, cancellationToken);
    }
}

