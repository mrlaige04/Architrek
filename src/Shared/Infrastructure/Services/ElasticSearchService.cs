using Application.Common.Interfaces;
using Domain.Common;
using Nest;

namespace Infrastructure.Services;
public class ElasticSearchService : IElasticSearchService
{
    private readonly ElasticClient _elasticClient;

    public ElasticSearchService(ElasticClient elasticClient)
    {
        _elasticClient = elasticClient;
    }

    public async Task IndexEntityAsync<TEntity>(TEntity entity) 
        where TEntity : BaseEntity
    {
        await _elasticClient.IndexAsync<TEntity>(entity, t =>
            t.Id(entity.Id).Index(typeof(TEntity).Name)
        );
    }

    public async Task<IEnumerable<TEntity>> SearchAsync<TEntity>() where TEntity : BaseEntity
    {
        var searchResponse = await _elasticClient.SearchAsync<TEntity>(q=>
            q.Index(typeof(TEntity).Name)
                .Query(qq=>
                    qq.Match(m=>
                        m.Field("sdf")
                        .Query("")
        )));

        return searchResponse.Documents.ToList();
    }
}
