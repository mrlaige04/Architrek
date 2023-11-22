using Application.Common.Interfaces;
using System.Text.RegularExpressions;

namespace CoreApi.Services.Interceptors;

public class ExtractCodeEmailMessageInterceptor : IEmailMessageInterceptors
{
    public string Intercept(string message)
    {
        var urlPattern = @"<a\s+.*?href=(['""])(.*?)\1";
        var codePattern = @"code=([^\&]+)";

        var urlMatch = Regex.Match(message, urlPattern);
        var url = urlMatch.Success ? urlMatch.Groups[2].Value : null;

        var codeMatch = Regex.Match(url, codePattern);
        var code = codeMatch.Success ? codeMatch.Groups[1].Value : null;

        return code!;
    }
}
