using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Reviews.DeleteReview;
public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public DeleteReviewCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Result> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var review = await _context.SightReviews
            .FirstOrDefaultAsync(sr => sr.Id == request.Id);

        if (review == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Review", request.Id));

        _context.SightReviews.Remove(review);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
