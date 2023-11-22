using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.Reviews.AddReview;
public class AddReviewCommandHandler : IRequestHandler<AddReviewCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public AddReviewCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new SightReview
        {
            SightId = request.SightId,
            OwnerId = request.UserId,
            Posted = DateTime.UtcNow,
            ReviewText = request.Text,
            Rating = request.Rating,
            Reviewer = request.Reviewer,
            
        };

        if (request.Photos != null && request.Photos.Any()) { 
            review.Photos = new List<SightReviewPhoto>();
            foreach (var photo in request.Photos)
            {
                review.Photos.Add(new SightReviewPhoto { Url = photo });
            }
        }

        var user = await _context.SightReviews.AddAsync(review, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
