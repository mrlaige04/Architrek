using Application.Common.Interfaces;
using Application.Common.Models;

namespace Application.CQRS.Admin.Reviews.DeleteReview;
public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteReviewCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await _context.SightReviews
            .FirstOrDefaultAsync(rev => rev.Id == request.Id);
        if (review == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.Review.NotFound(request.Id));

        var reviewPhotos = _context.SightReviewPhotos.Where(revp => revp.SightReviewId == request.Id);

        _context.SightReviewPhotos.RemoveRange(reviewPhotos);
        _context.SightReviews.Remove(review);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
