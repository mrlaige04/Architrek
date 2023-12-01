using Application.Common.Models;

namespace Application.CQRS.Admin.Categories.CreateCategoryCommand;
public class CreateCategoryCommand : IRequest<Result>
{
    public string Name { get; set; }
    public Guid? ParentCategoryId { get; set; }
}