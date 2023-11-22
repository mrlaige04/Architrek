using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Categories.CreateCategoryCommand;
public class CreateCategoryCommand : IRequest<Result>
{
    public string Name { get; set; }
}


