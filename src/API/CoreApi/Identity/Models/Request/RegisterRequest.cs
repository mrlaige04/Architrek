using System.ComponentModel.DataAnnotations;

namespace CoreApi.Identity.Models.Request;

public class RegisterRequest
{
    public string Email { get; set; }
    public string? Username { get; set; }
    public string Password { get; set; }
}
