using Application.Common.Interfaces;
using Application.Common.Models;

namespace Application.CQRS.Admin.Countries.DeleteCountry;
public class DeleteCountryCommandHandler : IRequestHandler<DeleteCountryCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteCountryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteCountryCommand request, CancellationToken cancellationToken)
    {
        var country = await _context.Countries.FirstAsync(c => c.Id == request.Id, cancellationToken);
        if (country == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.Country.NotFound(request.Id));

        var sightsFromThisCountry = _context.Sights
            .Include(s => s.Location)
                .ThenInclude(l => l.Country)
            .Where(s => s.Location.Country.Id == country.Id);
            

        _context.Sights.RemoveRange(sightsFromThisCountry);
        _context.Countries.Remove(country);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
