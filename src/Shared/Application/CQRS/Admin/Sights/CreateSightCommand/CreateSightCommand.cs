using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Sights.CreateSightCommand;
public class CreateSightCommand : IRequest<Result>
{
    public string Name { get; set; }
    public string Description { get; set; }
    //public Location Location { get; set; }
    public Guid CategoryId { get; set; }

    public ICollection<PhotoCreate>? SightPhotos { get; set; }
    public ICollection<PropertyValueCreate> PropertyValues { get; set; }
    public ICollection<TagCreate>? Tags { get; set; }
}

public class PropertyValueCreate
{
    public Guid PropertyId { get; set; }
    public string JsonValue { get; set; }
}

public record TagCreate(string Name);
public record PhotoCreate(string Base64Data);
