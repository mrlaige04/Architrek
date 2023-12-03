using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;
public class SightReviewConfiguration : IEntityTypeConfiguration<SightReview>
{
    public void Configure(EntityTypeBuilder<SightReview> builder)
    {
        builder.HasKey(sr => sr.Id);

        builder
            .HasMany(sr=>sr.Photos)
            .WithOne(p=>p.SightReview)
            .HasForeignKey(p=>p.SightReviewId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
