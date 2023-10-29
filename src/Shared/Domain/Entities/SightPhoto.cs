namespace Domain.Entities;
public class SightPhoto : BaseAuditableEntity
{
    public string Base64Data { get; set; }
    public string Format { get; set; }

    public Sight Sight { get; set; }
    public Guid SightId { get; set; }
}
