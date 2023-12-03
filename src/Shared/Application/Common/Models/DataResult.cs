namespace Application.Common.Models;
public class DataResult<T> : Result
{
    internal DataResult(bool succeeded, int status, IEnumerable<string> errors) : base(succeeded, status, errors)
    {
       
    }

    internal DataResult(bool succeeded, int status, T data, IEnumerable<string> errors) : this(succeeded, status, errors)
    {
        Data = data;
    }

    public T? Data { get; set; }

    public static DataResult<T> Success(T data)
    {
        return new DataResult<T>(true, 200, data, Array.Empty<string>());
    }

    public new static DataResult<T> Failure(int status, IEnumerable<string> errors)
    {
        return new DataResult<T>(false, status, errors);
    }

    public new static DataResult<T> Failure(int status, params string[] errors)
    {
        return new DataResult<T>(false, status, errors);
    }
}
