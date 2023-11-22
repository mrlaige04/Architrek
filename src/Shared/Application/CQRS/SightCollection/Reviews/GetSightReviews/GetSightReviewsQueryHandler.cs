using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CQRS.SightCollection.Reviews.GetSightReviews;
public class GetSightReviewsQueryHandler : IRequestHandler<GetSightReviewsQuery, IEnumerable<SightReview>>
{
    private readonly IApplicationDbContext _context;

    public GetSightReviewsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<SightReview>> Handle(GetSightReviewsQuery request, CancellationToken cancellationToken)
    {
        return await _context.SightReviews
            .Include(sr => sr.Photos)
            .Where(sr => sr.SightId == request.SightId)
            .ToListAsync();
    }
}
