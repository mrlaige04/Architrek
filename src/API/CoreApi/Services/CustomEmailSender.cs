﻿using Application.Common.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;

namespace CoreApi.Services;

public class CustomEmailSender : IEmailSender
{
    private readonly IEnumerable<IEmailMessageInterceptors> _emailMessageInterceptors;

    private string Mail { get; set; }
    private string Code { get; set; }

    public CustomEmailSender(IEnumerable<IEmailMessageInterceptors> emailMessageInterceptors, IConfiguration configuration)
    {
        _emailMessageInterceptors = emailMessageInterceptors;
        Mail = configuration["smtp:google:mail"]!;
        Code = configuration["smtp:google:code"]!;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        foreach (var emailMessageInterceptor in _emailMessageInterceptors)
        {
            htmlMessage = emailMessageInterceptor.Intercept(htmlMessage);
        }

        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = htmlMessage
        };

        var emailMessage = new MimeMessage
        {
            Body = bodyBuilder.ToMessageBody(),
            Subject = subject
        };

        emailMessage.From.Add(new MailboxAddress("Architrek", Mail));
        emailMessage.To.Add(new MailboxAddress("", email));

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync("smtp.gmail.com", 465, true);
            await client.AuthenticateAsync(Mail, Code);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
        catch { }
    }
}
