using Domain.Entities;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<Category> Categories { get; }
    DbSet<Tag> Tags { get; }
    DbSet<Country> Countries { get; }
    DbSet<SightReviewPhoto> SightReviewPhotos { get; }
    DbSet<SightReview> SightReviews { get; }
    DbSet<Sight> Sights { get; }
    DbSet<Property> Properties { get; }
    DbSet<PropertyValue> PropertyValues { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
