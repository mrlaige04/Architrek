using Application.Common.Models;
using Application.CQRS.Admin.Categories.CreateCategoryCommand;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class AdminController : ApiControllerBase
{
    [HttpPost, Route("")]
    public async Task<Result> CreateCategoryAsync([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);
}
