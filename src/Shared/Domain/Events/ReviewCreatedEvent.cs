namespace Domain.Events;
public class ReviewCreatedEvent : BaseEvent
{
    public ReviewCreatedEvent(SightReview review)
    {
        Review = review;
    }

    public SightReview Review { get; }
}
