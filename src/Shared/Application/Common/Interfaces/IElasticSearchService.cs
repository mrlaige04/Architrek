using Domain.Common;

namespace Application.Common.Interfaces;
public interface IElasticSearchService
{
    public Task IndexEntityAsync<TEntity>(TEntity entity) where TEntity : BaseEntity;

    public Task<IEnumerable<TEntity>> SearchAsync<TEntity>() where TEntity: BaseEntity;
}
