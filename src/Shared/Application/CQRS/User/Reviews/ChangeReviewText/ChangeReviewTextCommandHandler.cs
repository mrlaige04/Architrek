using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Reviews.ChangeReviewText;
public class ChangeReviewTextCommandHandler : IRequestHandler<ChangeReviewTextCommand, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public ChangeReviewTextCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Result> Handle(ChangeReviewTextCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var review = await _context.SightReviews
            .FirstOrDefaultAsync(sr => sr.Id == request.Id);

        if (review == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Review", request.Id));

        review.ReviewText = request.Text;

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
