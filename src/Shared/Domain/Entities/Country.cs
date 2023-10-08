namespace Domain.Entities;
public class Country : BaseAuditableEntity
{
    public string Name { get; set; }
    public int Population { get; set; }
    public string Currency { get; set; }
    public double Area { get; set; }
    public string Language { get; set; }


    public City? Capital { get; set; }
    public Mainland Mainland { get; set; }

    public ICollection<Photo> Photos { get; set; }
    public ICollection<City> Cities { get; set; }
    public ICollection<Review> Reviews { get; set; }
}
