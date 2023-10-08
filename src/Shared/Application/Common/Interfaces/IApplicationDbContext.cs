using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<Category> Categories { get; }
    DbSet<City> Cities { get; }
    DbSet<Country> Countries { get; }
    DbSet<Photo> Photos { get; }
    DbSet<Review> Reviews { get; }
    DbSet<Sight> Sights { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
