namespace Domain.Entities;
public class Photo : BaseAuditableEntity
{
    public string Base64Data { get; set; }
    public string Format { get; set; }
    public Guid ObjectId { get; set; }
}
