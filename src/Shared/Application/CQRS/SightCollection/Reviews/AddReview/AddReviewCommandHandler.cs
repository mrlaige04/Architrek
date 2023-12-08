using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.SightCollection.Reviews.AddReview;
public class AddReviewCommandHandler : IRequestHandler<AddReviewCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public AddReviewCommandHandler(IApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<Result> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var review = new SightReview
        {
            SightId = request.SightId,
            OwnerId = user.Id,
            Posted = DateTime.UtcNow,
            ReviewText = request.Text,
            Rating = request.Rating,
            Reviewer = user.UserName,  
        };

        if (request.Photos != null && request.Photos.Count != 0) { 
            review.Photos = new List<SightReviewPhoto>();
            foreach (var photo in request.Photos)
            {
                review.Photos.Add(new SightReviewPhoto { Url = photo });
            }
        }

        await _context.SightReviews.AddAsync(review, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
