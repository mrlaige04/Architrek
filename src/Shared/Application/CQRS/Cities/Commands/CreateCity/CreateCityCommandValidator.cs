namespace Application.CQRS.Cities.Commands.CreateCity;
public class CreateCityCommandValidator : AbstractValidator<CreateCityCommand>
{
    public CreateCityCommandValidator()
    {
        RuleFor(c=>c.Name)
            .NotEmpty();
    }
}
