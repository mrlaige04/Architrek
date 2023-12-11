using Application.Common.Interfaces;
using Application.Common.Models;

namespace Application.CQRS.Admin.Sights.DeleteSight;
public class DeleteSightCommandHandler : IRequestHandler<DeleteSightCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteSightCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteSightCommand request, CancellationToken cancellationToken)
    {
        var sight = await _context.Sights.FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
        if (sight == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.Sight.NotFound(request.Id));

        _context.Sights.Remove(sight);
        await _context.SaveChangesAsync(CancellationToken.None);

        return Result.Success();
    }
}
