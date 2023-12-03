using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Countries.GetAllCountries;
public record GetAllCountriesQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<Country>>;

