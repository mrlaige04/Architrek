using Application.Common.Models;

namespace Application.CQRS.Admin.Reviews.DeleteReview;
public record DeleteReviewCommand(Guid Id) : IRequest<Result>;
