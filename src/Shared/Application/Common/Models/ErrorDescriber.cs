namespace Application.Common.Models;
public static class ErrorDescriber
{
    public static UserErrorDescriber User { get; set; } = new UserErrorDescriber();
    public static CategoryErrorDescriber Category { get; set; } = new CategoryErrorDescriber();
    public static ReviewErrorDescriber Review { get; set; } = new ReviewErrorDescriber();
    public static SightErrorDescriber Sight { get; set; } = new SightErrorDescriber();
    public static CountryErrorDescriber Country { get; set; } = new CountryErrorDescriber();

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

public class ReviewErrorDescriber
{
    public string NotFound(Guid id) => $"Review {id} not found";
} 

public class SightErrorDescriber
{
    public string NotFound(Guid id) => $"Sight {id} not found";
    public string AlreadyInFavorite(Guid id) => $"Sight {id} is already in favorite";
    public string IsNotInFavorite(Guid id) => $"Sight {id} is not in favorite";
}

public class CountryErrorDescriber
{
    public string AlreadyExists(string name) => $"Country {name} already exists";
    public string NotFound(string name) => $"Country {name} not found";
    public string NotFound(Guid id) => $"Country {id} not found";
}