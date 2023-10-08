namespace Domain.Exceptions;
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
        
    }

    public NotFoundException(string entity, string key)
        : base($"Entity {entity} with {key} not found.")
    {
        
    }
}
