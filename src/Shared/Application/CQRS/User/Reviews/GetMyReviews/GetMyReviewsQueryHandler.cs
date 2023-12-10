using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.CQRS.User.Profile.GetProfile;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Reviews.GetMyReviews;
public class GetMyReviewsQueryHandler : IRequestHandler<GetMyReviewQuery, DataResult<PaginatedList<SightReview>>>
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public GetMyReviewsQueryHandler(IApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<DataResult<PaginatedList<SightReview>>> Handle(GetMyReviewQuery request, CancellationToken cancellationToken)
    {
        if (request.User == null) return DataResult<PaginatedList<SightReview>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return DataResult<PaginatedList<SightReview>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        return DataResult<PaginatedList<SightReview>>.Success(
            await _context.SightReviews
            .Include(sr => sr.Photos)
            .Where(sr => sr.OwnerId == user.Id)
            .PaginatedListAsync(request.PageNumber, request.PageSize)
            );
    }
}
