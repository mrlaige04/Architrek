using Domain.Entities;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<Category> Categories { get; }
    DbSet<Country> Countries { get; }
    DbSet<Location> Locations { get; }
    DbSet<Sight> Sights { get; }
    DbSet<SightPhoto> SightPhotos { get; }
    DbSet<SightReview> SightReviews { get; }
    DbSet<SightReviewPhoto> SightReviewPhotos { get; }
    DbSet<Tag> Tags { get; }
    DbSet<Report> Reports { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
