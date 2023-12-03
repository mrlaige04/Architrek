using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;
public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);

        

        builder
            .HasMany(c => c.Sights)
            .WithOne(s => s.Category)
            .HasForeignKey(s => s.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(c => c.Parent)
            .WithMany(c => c.Subcategories)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
