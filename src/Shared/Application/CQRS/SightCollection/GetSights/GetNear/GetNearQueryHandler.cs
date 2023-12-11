using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;
using NetTopologySuite.Geometries;
using NetTopologySuite.Utilities;


namespace Application.CQRS.SightCollection.GetSights.GetNear;
public class GetNearQueryHandler : IRequestHandler<GetNearQuery, PaginatedList<Sight>>
{
    private readonly IApplicationDbContext _context;

    public GetNearQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<Sight>> Handle(GetNearQuery request, CancellationToken cancellationToken)
    {
        var q = $"select * from public.\"Locations\" where ST_DistanceSphere(ST_MakePoint(\"Longitude\", \"Latitude\"), ST_GeomFromText('POINT({request.Longitude} {request.Latitude})')) / 1000 <= {request.Radius}";
        var sightsInRadius = _context.Locations
                 .FromSqlRaw(q)
                 .Select(l => l.SightId);

        return await _context.Sights
            .Include(s => s.SightPhotos)
            .Include(s => s.Tags)
            .Where(s => sightsInRadius.Contains(s.Id))
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
