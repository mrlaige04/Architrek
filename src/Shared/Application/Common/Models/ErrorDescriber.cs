namespace Application.Common.Models;
public static class ErrorDescriber
{
    public static UserErrorDescriber User { get; set; }
    public static CategoryErrorDescriber Category { get; set; }


    public static string NotFound(string entity, object key) => $"Entity {entity} {key} not found";
}

public class UserErrorDescriber {
    public string NotFound(Guid id) => $"User {id} not found";
    public string NotFound(string email) => $"User {email} not found";
    public string Unauthorized() => "Unauthorized";
}

public class CategoryErrorDescriber
{
    public string NotFound(Guid id) => $"Category {id} not found";
}
