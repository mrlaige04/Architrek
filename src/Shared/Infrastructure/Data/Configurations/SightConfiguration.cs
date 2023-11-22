using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;
public class SightConfiguration : IEntityTypeConfiguration<Sight>
{
    public void Configure(EntityTypeBuilder<Sight> builder)
    {
        builder.HasKey(s => s.Id);

       

        builder
            .HasOne(s=>s.Location)
            .WithOne(l=>l.Sight)
            .HasForeignKey<Location>(l=>l.SightId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(s => s.Reviews)
            .WithOne(sr => sr.Sight)
            .HasForeignKey(sr => sr.SightId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(s => s.SightPhotos)
            .WithOne(sp => sp.Sight)
            .HasForeignKey(sp => sp.SightId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(s => s.Tags)
            .WithOne(t => t.Sight)
            .HasForeignKey(t => t.SightId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
