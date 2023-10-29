using Domain.Entities;

namespace Application.CQRS.Categories.GetAllCategories;
public record GetAllCategoriesQuery : IRequest<IEnumerable<CategoryName>>;