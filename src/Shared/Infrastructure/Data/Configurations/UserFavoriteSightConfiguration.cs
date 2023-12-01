using Application.Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;
public class UserFavoriteSightConfiguration : IEntityTypeConfiguration<UserFavoriteSight>
{
    public void Configure(EntityTypeBuilder<UserFavoriteSight> builder)
    {
        builder
            .HasKey(ufs => new { ufs.UserId, ufs.SightId });

        builder
            .HasOne(ufs => ufs.User)
            .WithMany(u => u.FavoriteSights)
            .HasForeignKey(ufs => ufs.UserId);

        builder
            .HasOne(ufs => ufs.Sight)
            .WithMany()
            .HasForeignKey(ufs => ufs.SightId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
