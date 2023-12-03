using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reviews.GetAllReviews;
public record GetAllReviewsQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<SightReview>>;