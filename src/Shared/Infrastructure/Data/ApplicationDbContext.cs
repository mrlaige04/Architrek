using System.Linq;
using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public sealed class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<SightReviewPhoto> SightReviewPhotos { get; set; }
    public DbSet<SightReview> SightReviews { get; set; }
    public DbSet<Sight> Sights { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<PropertyValue> PropertyValues { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


        var categories = new List<Category> {
            new Category("Rivers"),
            new Category("Buildings"),
            new Category("Cities"),
            new Category("Cats")
        };

        categories.ForEach(category => category.Id = Guid.NewGuid());

        builder.Entity<Category>()
            .HasData(
                categories
            );

        var sights = Enumerable
            .Range(1, 50)
            .ToList()
            .Select(i => new Sight() { Id = Guid.NewGuid(), CategoryId = categories[Random.Shared.Next(0, categories.Count - 1)].Id, Name = $"Test{i}" });
        

        

        builder.Entity<Sight>()
            .HasData(
                sights
            );


        base.OnModelCreating(builder);
    }
}