﻿using Application.Common.Models;
using Application.CQRS.Categories.GetAllCategories;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class CategoriesController : ApiControllerBase
{
    [HttpGet, Route("")]
    public async Task<PaginatedList<Category>> GetCategoriesAsync([FromQuery] GetAllCategoriesQuery query)
        => await Mediator.Send(query);
}
