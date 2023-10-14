using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;
public class CountryConfiguration : IEntityTypeConfiguration<Country>
{
    public void Configure(EntityTypeBuilder<Country> builder)
    {
        builder.HasKey(c => c.Id);

        builder
            .HasMany(c=>c.Cities)
            .WithOne(c=> c.Country)
            .HasForeignKey(c=>c.CountryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(c=>c.Photos)
            .WithOne()
            .HasForeignKey(p=>p.ObjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("Countries");
    }
}
