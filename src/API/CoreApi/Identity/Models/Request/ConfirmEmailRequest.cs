namespace CoreApi.Identity.Models.Request;

public record ConfirmEmailRequest (Guid UserId, string Code);