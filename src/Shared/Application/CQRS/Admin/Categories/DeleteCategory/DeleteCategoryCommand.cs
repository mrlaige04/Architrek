using Application.Common.Models;

namespace Application.CQRS.Admin.Categories.DeleteCategory;
public record DeleteCategoryCommand(Guid Id) : IRequest<Result>;