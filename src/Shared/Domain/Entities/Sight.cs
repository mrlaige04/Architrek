namespace Domain.Entities;
public class Sight : BaseAuditableEntity
{
    public Coordinate Coordinate { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public ICollection<Category> Categories { get; set; }
}
