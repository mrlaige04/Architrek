using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;
public class Report : BaseAuditableEntity
{
    [NotMapped] public static Dictionary<Subject, string> subjectDescriptions = new()
    {
        { Subject.AccountIssues, "Account Issues" },
        { Subject.TechnicalQuestions, "Technical Questions" },
        { Subject.Feedback, "Feedback" },
        { Subject.ContentSuggestions, "Content Suggestions" },
        { Subject.TechnicalProblems, "Technical Problems" },
        { Subject.Partnership, "Partnership" },
        { Subject.Other, "Other" }
    };

    [NotMapped] public static Dictionary<ReportStatus, string> reportStatusDescriptions = new()
    {
        { ReportStatus.Created, "Created" },
        { ReportStatus.Active, "Active" },
        { ReportStatus.Solved, "Solved" },
        { ReportStatus.Rejected, "Rejected" }
    };

    public string Email { get; set; }
    public Subject Subject { get; set; }
    public string SubjectText => subjectDescriptions[Subject];

    public string Message { get; set; }

    public ReportStatus Status { get; set; }
}

public enum ReportStatus
{
    Created = 0,
    Active,
    Solved,
    Rejected
}

public enum Subject
{
    AccountIssues = 0,
    TechnicalQuestions,
    Feedback,
    ContentSuggestions,
    TechnicalProblems,
    Partnership,
    Other
}