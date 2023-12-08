using Application.Common.Models;
using Application.CQRS.Admin.Categories.CreateCategoryCommand;
using Application.CQRS.Admin.Categories.DeleteCategory;
using Application.CQRS.Admin.Countries.CreateCountry;
using Application.CQRS.Admin.Countries.DeleteCountry;
using Application.CQRS.Admin.Countries.GetAllCountries;
using Application.CQRS.Admin.IsAdmin;
using Application.CQRS.Admin.Reports.AnswerReport;
using Application.CQRS.Admin.Reports.DeleteReport;
using Application.CQRS.Admin.Reports.GetAllReports;
using Application.CQRS.Admin.Reports.RejectReport;
using Application.CQRS.Admin.Reports.SetActive;
using Application.CQRS.Admin.Reviews.DeleteReview;
using Application.CQRS.Admin.Reviews.GetAllReviews;
using Application.CQRS.Admin.Sights.CreateSightCommand;
using Application.CQRS.Admin.Sights.DeleteSight;
using Application.CQRS.Admin.Users.DeleteUser;
using Application.CQRS.Admin.Users.GetAllUsers;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Result = Application.Common.Models.Result;

namespace CoreApi.Controllers;

[Authorize("admin")]
public class AdminController : ApiControllerBase
{
    #region Users
    [HttpGet, Route("users")] public async Task<PaginatedList<ApplicationUser>> GetAllUsers([FromQuery] GetAllUsersQuery query)
        => await Mediator.Send(query);

    [HttpDelete, Route("users/{Id:guid}")] public async Task<Result> DeleteUser([FromRoute] DeleteUserCommand command)
        => await Mediator.Send(command);
    #endregion

    #region Categories
    [HttpPost, Route("categories")] public async Task<Result> CreateCategory([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);
    
    [HttpDelete, Route("categories/{Id:guid}")] public async Task<Result> DeleteCategory([FromRoute] DeleteCategoryCommand command)
        => await Mediator.Send(command);
    #endregion
    
    #region Sights
    [HttpPost, Route("sights")] public async Task<Result> CreateSight([FromBody] CreateSightCommand command)
        => await Mediator.Send(command);

    [HttpDelete, Route("sights/{Id:guid}")]
    public async Task<Result> DeleteSight([FromRoute] DeleteSightCommand command)
        => await Mediator.Send(command);
    #endregion

    #region Countries
    [HttpGet, Route("countries")] public async Task<PaginatedList<Country>> GetAllCountries([FromQuery] GetAllCountriesQuery query)
        => await Mediator.Send(query);

    [HttpPost, Route("countries")] public async Task<Result> CreateCountry([FromBody] CreateCountryCommand command)
        => await Mediator.Send(command);

    [HttpDelete, Route("countries/{Id:guid}")] public async Task<Result> DeleteCountry([FromRoute] DeleteCountryCommand command)
        => await Mediator.Send(command);
    #endregion

    #region Reviews
    [HttpGet, Route("reviews")] public async Task<PaginatedList<SightReview>> GetAllReviews([FromQuery] GetAllReviewsQuery query)
        => await Mediator.Send(query);

    [HttpDelete, Route("reviews/{Id:guid}")] public async Task<Result> DeleteReview([FromRoute] DeleteReviewCommand command)
        => await Mediator.Send(command);
    #endregion

    #region Reports
    [HttpGet, Route("reports")] public async Task<PaginatedList<Report>> GetAllReports([FromQuery] GetAllReportsQuery query)
        => await Mediator.Send(query);

    [HttpDelete, Route("reports/{Id:guid}")] public async Task<Result> DeleteReport([FromRoute] DeleteReportCommand command)
        => await Mediator.Send(command);

    [HttpPost, Route("reports/{Id:guid}")]
    public async Task<Result> SetActiveReport([FromRoute] SetActiveReportCommand command)
        => await Mediator.Send(command);

    [HttpPost, Route("reports/answers")]
    public async Task<Result> AnswerToReport([FromBody] AnswerReportCommand command)
        => await Mediator.Send(command);

    [HttpPost, Route("reports/{Id:guid}/rejects")]
    public async Task<Result> RejectToReport([FromRoute] RejectReportCommand command)
        => await Mediator.Send(command);
    #endregion

    [HttpGet, Route("isAdmin"), AllowAnonymous]
    public async Task<bool> IsAdmin()
        => await Mediator.Send(new IsAdminQuery() { User = User });
}
