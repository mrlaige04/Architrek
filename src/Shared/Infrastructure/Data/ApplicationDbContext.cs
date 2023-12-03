using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;


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
    public DbSet<Location> Locations { get; set; }
    public DbSet<SightPhoto> SightPhotos { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<UserAvatar> UserAvatars { get; set; }
    public DbSet<UserFavoriteSight> UserFavoriteSights { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}