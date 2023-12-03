using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reviews.GetAllReviews;
public class GetAllReviewsQueryHandler : IRequestHandler<GetAllReviewsQuery, PaginatedList<SightReview>>
{
    private readonly IApplicationDbContext _context;

    public GetAllReviewsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<SightReview>> Handle(GetAllReviewsQuery request, CancellationToken cancellationToken)
    {
        return await _context.SightReviews
            .Include(sr => sr.Photos)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
