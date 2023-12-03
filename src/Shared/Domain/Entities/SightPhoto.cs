namespace Domain.Entities;
public class SightPhoto : BaseAuditableEntity
{
    public string Url { get; set; }
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }
    public SightPhoto(string url)
    {
        Url = url;
    }
}
