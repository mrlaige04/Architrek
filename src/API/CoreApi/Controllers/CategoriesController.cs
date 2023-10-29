using Application.CQRS.Categories.GetAllCategories;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class CategoriesController : ApiControllerBase
{
    [HttpGet, Route("")]
    public async Task<IEnumerable<CategoryName>> GetCategoriesAsync()
        => await Mediator.Send(new GetAllCategoriesQuery());
}
