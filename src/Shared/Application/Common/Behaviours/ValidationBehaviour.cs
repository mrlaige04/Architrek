using ValidationException = Application.Common.Exceptions.ValidationException;

namespace Application.Common.Behaviours;
public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : class
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (_validators.Any())
        {
            var validationContext = new ValidationContext<TRequest>(request);
            var validationFailures = await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(validationContext, cancellationToken)));
            var errors = validationFailures.SelectMany(r => r.Errors).Where(error => error != null).ToList();

            if (errors.Any())
                throw new ValidationException(errors);
        }

        return await next();
    }
}
