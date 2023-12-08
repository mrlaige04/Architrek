using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Sights.CreateSightCommand;
public class CreateSightCommand : IRequest<Result>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public LocationCreate Location { get; set; }
    public Guid CategoryId { get; set; }

    public ICollection<PhotoCreate>? Photos { get; set; }
    public ICollection<TagCreate>? Tags { get; set; }
    public ICollection<InfoBlockCreate>? InfoBlocks { get; set; }
}


public record TagCreate(string Name);
public record PhotoCreate(string Url);
public record LocationCreate(Guid CountryId, double latitude, double longitude);
public record InfoBlockCreate(string Title, string Text);
