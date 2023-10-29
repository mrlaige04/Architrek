﻿using System.ComponentModel.DataAnnotations;

namespace CoreApi.Identity.Models.Request;

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
