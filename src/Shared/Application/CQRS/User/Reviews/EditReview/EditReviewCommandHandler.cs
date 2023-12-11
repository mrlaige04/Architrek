using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Reviews.EditReview;
public class EditReviewCommandHandler : IRequestHandler<EditReviewCommand, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public EditReviewCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Result> Handle(EditReviewCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return DataResult<PaginatedList<SightReview>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return DataResult<PaginatedList<SightReview>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var review = await _context.SightReviews
            .FirstOrDefaultAsync(sr => sr.Id == request.Id);

        if (review == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Review", request.Id));

        review.ReviewText = request.Text;
        review.Rating = request.Rating;


        if (request.Photos != null)
        {
            var removePhotos = request.Photos.Remove;

            foreach (var photo in removePhotos)
            {
                var _photo = await _context.SightReviewPhotos.FirstOrDefaultAsync(srp => srp.Id == photo);
                if (_photo == null) continue;
                _context.SightReviewPhotos.Remove(_photo);
            }

            var addPhotos = request.Photos.Add;

            foreach (var photo in addPhotos)
            {
                await _context.SightReviewPhotos.AddAsync(new SightReviewPhoto { Url = photo, SightReviewId = review.Id });
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
