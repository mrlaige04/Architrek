using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CQRS.Cities.Queries;
public class GetCityById : IRequest<City?>
{
    public Guid Id { get; set; }
}

public class GetCityByIdHandler : IRequestHandler<GetCityById, City?>
{
    private readonly IApplicationDbContext _context;

    public GetCityByIdHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<City?> Handle(GetCityById request, CancellationToken cancellationToken)
    {
        return await _context.Cities
            .FirstOrDefaultAsync(c =>c.Id == request.Id, cancellationToken);
    }
}
