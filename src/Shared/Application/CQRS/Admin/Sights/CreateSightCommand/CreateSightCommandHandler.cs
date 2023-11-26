﻿using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Sights.CreateSightCommand;
public class CreateSightCommandHandler : IRequestHandler<CreateSightCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateSightCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateSightCommand request, CancellationToken cancellationToken)
    {
        var category = await _context
            .Categories
            //.Include(c => c.Sights)
            .FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken: cancellationToken);

        if (category == null) return Result.Failure("Category not found");

        var sight = new Sight
        {
            Category = category,
            Name = request.Name,
            Description = request.Description
        };

        var country = await _context.Countries.FirstOrDefaultAsync(c=>c.Id == request.Location.CountryId, cancellationToken: cancellationToken);

        if (country == null) return Result.Failure("Country not found");

        sight.Location = new Location
        {
            Country = country,
            Latitude = request.Location.latitude,
            Longitude = request.Location.longitude
        };


        if (request.Photos != null && request.Photos.Count > 0)
        {
            sight.SightPhotos = new List<SightPhoto>();
            foreach (var photo in request.Photos)
            {
                sight.SightPhotos.Add(new SightPhoto(photo.Url));
            }
        }

        if (request.Tags != null && request.Tags.Count > 0)
        {
            sight.Tags = new List<Tag>();
            foreach (var tag in request.Tags)
            {
                sight.Tags.Add(new Tag(tag.Name));
            }
        }

        await _context.Sights.AddAsync(sight);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}