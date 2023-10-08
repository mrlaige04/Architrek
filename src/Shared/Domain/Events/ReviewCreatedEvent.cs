﻿namespace Domain.Events;
public class ReviewCreatedEvent : BaseEvent
{
    public ReviewCreatedEvent(Review review)
    {
        Review = review;
    }

    public Review Review { get; }
}
