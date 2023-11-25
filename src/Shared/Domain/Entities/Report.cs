namespace Domain.Entities;
public class Report : BaseAuditableEntity
{
    public string Email { get; set; }
    public string Topic { get; set; }
    public string Text { get; set; }
    public ReportStatus Status { get; set; }
}

public enum ReportStatus
{
    Created = 0,
    Active,
    Solved,
    Rejected
}