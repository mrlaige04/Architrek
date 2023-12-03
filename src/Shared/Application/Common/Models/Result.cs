namespace Application.Common.Models;
public class Result
{
    internal Result(bool succeeded, int status, IEnumerable<string> errors)
    {
        Succeeded = succeeded;
        Status = status;
        Errors = errors.ToArray();
    }

    public int Status { get; init; }

    public bool Succeeded { get; init; }

    public string[] Errors { get; init; }

    public static Result Success()
    {
        return new Result(true, 200, Array.Empty<string>());
    }

    public static Result Failure(int status, IEnumerable<string> errors)
    {
        return new Result(false, status, errors);
    }

    public static Result Failure(int status, params string[] errors)
    {
        return new Result(false, status, errors);
    }
}


public static class ResultStatus
{
    public static int NotFound = 404;
    public static int Unauthorized = 401;
    public static int InternalError = 500;
    public static int BadRequest = 400;
}
