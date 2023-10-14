using Application.Common.Interfaces;
using System.Text.RegularExpressions;

namespace CoreApi.Services.Interceptors;

public class FixAbsoluteUriEmailMessageInterceptor : IEmailMessageInterceptors
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public FixAbsoluteUriEmailMessageInterceptor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    public string Intercept(string message)
    {
        var ctx = _httpContextAccessor.HttpContext;
        var uriBuilder = new UriBuilder(ctx.Request.Scheme, ctx.Request.Host.Host, ctx.Request.Host.Port ?? -1);
        if (uriBuilder.Uri.IsDefaultPort)
        {
            uriBuilder.Port = -1;
        }

        var baseUrl = uriBuilder.Uri.AbsoluteUri;

        string pattern = "<a\\s+href='([^']*)'";
        string absoluteBaseUrl = baseUrl.TrimEnd('/') + '/';

        string modifiedText = Regex.Replace(message, pattern, match =>
        {
            string relativeUrl = match.Groups[1].Value;
            string absoluteUrl = new Uri(new Uri(absoluteBaseUrl), relativeUrl).ToString();
            return $"<a href='{absoluteUrl}'";
        });

        return modifiedText;
    }
}
