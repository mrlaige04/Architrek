namespace Application.CQRS.Countries.Commands.CreateCountry;
public class CreateCountryCommandValidator : AbstractValidator<CreateCountryCommand>
{
    public CreateCountryCommandValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty();

        RuleFor(c=>c.Population)
            .NotEmpty()
            .GreaterThan(0);

        RuleFor(c => c.Currency)
            .NotEmpty();

        RuleFor(c=>c.CurrencyEn)
            .NotEmpty();

        RuleFor(c=>c.Area)
            .NotEmpty()
            .GreaterThan(0);

        RuleFor(c=>c.Language)
            .NotEmpty();

        RuleFor(c=>c.Mainland)
            .NotEmpty();

        RuleFor(c=>c.Capital)
            .NotEmpty();
    }
}
