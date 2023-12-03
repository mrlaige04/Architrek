using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Categories.GetAllCategories;
public record GetAllCategoriesQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<Category>>;
