namespace Domain.Entities;
public class Sight : BaseAuditableEntity
{
    public string Name { get; set; }
    public Location Location { get; set; }
    public Category Category { get; set; }
    public Guid CategoryId { get; set; }

    public ICollection<SightPhoto> SightPhotos { get; set; }
    public ICollection<SightReview> Reviews { get; set; }
    public ICollection<PropertyValue> PropertyValues { get; set; }
    public ICollection<Tag> Tags { get; set; }
}
