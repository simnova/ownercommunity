
export type FacetDetail = {
  count?: number;
  value?: string;
};

// from azure cognitive search

/**
 * Response containing search results from an index.
 */
export declare interface SearchDocumentsResult<TModel> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchIterator<TModel>;
}

/**
 * Response containing search results from an index.
 */
export declare interface SearchDocumentsResultBase {
  /**
   * The total count of results found by the search operation, or null if the count was not
   * requested. If present, the count may be greater than the number of results in this response.
   * This can happen if you use the $top or $skip parameters, or if Azure Cognitive Search can't
   * return all the requested documents in a single Search response.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly count?: number;
  /**
   * A value indicating the percentage of the index that was included in the query, or null if
   * minimumCoverage was not specified in the request.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly coverage?: number;
  /**
   * The facet query results for the search operation, organized as a collection of buckets for
   * each faceted field; null if the query did not include any facet expressions.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly facets?: {
      [propertyName: string]: FacetResult[];
  };
}

/** A single bucket of a facet query result. Reports the number of documents with a field value falling within a particular range or having a particular value or interval. */
export declare interface FacetResult {
  /** Describes unknown properties. The value of an unknown property can be of "any" type. */
  [property: string]: any;
  /**
   * The approximate count of documents falling within the bucket described by this facet.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly count?: number;
}

/**
 * An iterator for search results of a paticular query. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export declare type SearchIterator<TFields> = PagedAsyncIterableIterator<SearchResult<TFields>, SearchDocumentsPageResult<TFields>, ListSearchResultsPageSettings>;

/**
 * An interface that allows async iterable iteration both to completion and by page.
 */
export declare interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings = PageSettings> {
  /**
   * The next method, part of the iteration protocol
   */
  next(): Promise<IteratorResult<TElement>>;
  /**
   * The connection to the async iterator, part of the iteration protocol
   */
  [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;
  /**
   * Return an AsyncIterableIterator that works a page at a time
   */
  byPage: (settings?: TPageSettings) => AsyncIterableIterator<TPage>;
}

/**
 * Contains a document found by a search query, plus associated metadata.
 */
export declare type SearchResult<TModel> = {
  /**
   * The relevance score of the document compared to other documents returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly score: number;
  /**
   * Text fragments from the document that indicate the matching search terms, organized by each
   * applicable field; null if hit highlighting was not enabled for the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly highlights?: {
      [k in keyof TModel]?: string[];
  };
  document: TModel;
};

/**
 * Response containing search page results from an index.
 */
export declare interface SearchDocumentsPageResult<TModel> extends SearchDocumentsResultBase {
  /**
   * The sequence of results returned by the query.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly results: SearchResult<TModel>[];
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * Arguments for retrieving the next page of search results.
 */
export declare interface ListSearchResultsPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/**
 * An interface that tracks the settings for paged iteration
 */
export declare interface PageSettings {
  /**
   * The token that keeps track of where to continue the iterator
   */
  continuationToken?: string;
  /**
   * The size of the page during paged iteration
   */
  maxPageSize?: number;
}