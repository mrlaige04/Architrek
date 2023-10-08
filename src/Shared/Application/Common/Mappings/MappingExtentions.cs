﻿using Application.Common.Models;

namespace Application.Common.Mappings;
public static class MappingExtentions
{
    public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageNumber, int pageSize) where TDestination : class
            => PaginatedList<TDestination>.CreateAsync(queryable, pageNumber, pageSize);
}
