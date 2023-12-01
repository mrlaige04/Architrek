namespace Application.Common.Models;
public class DataResult<T> : Result
{
    internal DataResult(bool succeeded, IEnumerable<string> errors) : base(succeeded, errors)
    {
       
    }

    internal DataResult(bool succeeded, T data, IEnumerable<string> errors) : this(succeeded, errors)
    {
        Data = data;
    }

    public T? Data { get; set; }

    public static DataResult<T> Success(T data)
    {
        return new DataResult<T>(true, data, Array.Empty<string>());
    }

    public new static DataResult<T> Failure(IEnumerable<string> errors)
    {
        return new DataResult<T>(false, errors);
    }

    public new static DataResult<T> Failure(params string[] errors)
    {
        return new DataResult<T>(false, errors);
    }
}
