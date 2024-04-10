export interface BaseDocumentType {
  id: string;
}

export declare interface SearchIndex {
  /**
   * The name of the index.
   */
  name: string;
  /**
   * The fields of the index.
   */
  fields: SearchField[];
}


export declare type SearchFieldDataType = "Edm.String" | "Edm.Int32" | "Edm.Int64" | "Edm.Double" | "Edm.Boolean" | "Edm.DateTimeOffset" | "Edm.GeographyPoint" | "Collection(Edm.String)" | "Collection(Edm.Int32)" | "Collection(Edm.Int64)" | "Collection(Edm.Double)" | "Collection(Edm.Boolean)" | "Collection(Edm.DateTimeOffset)" | "Collection(Edm.GeographyPoint)";
export declare type SearchField = SimpleField | ComplexField;

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export declare interface SimpleField {
  /**
   * The name of the field, which must be unique within the fields collection of the index or
   * parent field.
   */
  name: string;
  /**
   * The data type of the field. Possible values include: 'Edm.String', 'Edm.Int32', 'Edm.Int64',
   * 'Edm.Double', 'Edm.Boolean', 'Edm.DateTimeOffset', 'Edm.GeographyPoint',
   * 'Collection(Edm.String)', 'Collection(Edm.Int32)', 'Collection(Edm.Int64)',
   * 'Collection(Edm.Double)', 'Collection(Edm.Boolean)', 'Collection(Edm.DateTimeOffset)',
   * 'Collection(Edm.GeographyPoint)'
   */
  type: SearchFieldDataType;
  /**
   * A value indicating whether the field uniquely identifies documents in the index. Exactly one
   * top-level field in each index must be chosen as the key field and it must be of type
   * Edm.String. Key fields can be used to look up documents directly and update or delete specific
   * documents. Default is false.
   */
  key?: boolean;
  /**
   * A value indicating whether the field can be returned in a search result. You can enable this
   * option if you want to use a field (for example, margin) as a filter, sorting, or scoring
   * mechanism but do not want the field to be visible to the end user. This property must be false
   * for key fields. This property can be changed on existing fields.
   * Disabling this property does not cause any increase in index storage requirements.
   * Default is false.
   */
  hidden?: boolean;
  /**
   * A value indicating whether the field is full-text searchable. This means it will undergo
   * analysis such as word-breaking during indexing. If you set a searchable field to a value like
   * "sunny day", internally it will be split into the individual tokens "sunny" and "day". This
   * enables full-text searches for these terms. This property must be false for simple
   * fields of other non-string data types.
   * Note: searchable fields consume extra space in your index since Azure Cognitive Search will store an
   * additional tokenized version of the field value for full-text searches.
   * Defaults to false for simple fields.
   */
  searchable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $filter queries. Filterable
   * differs from searchable in how strings are handled. Fields of type Edm.String or
   * Collection(Edm.String) that are filterable do not undergo word-breaking, so comparisons are
   * for exact matches only. For example, if you set such a field f to "sunny day", $filter=f eq
   * 'sunny' will find no matches, but $filter=f eq 'sunny day' will.
   * Default is false.
   */
  filterable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $orderby expressions. By
   * default Azure Cognitive Search sorts results by score, but in many experiences users will want
   * to sort by fields in the documents. A simple field can be sortable only if it is single-valued
   * (it has a single value in the scope of the parent document). Simple collection fields cannot
   * be sortable, since they are multi-valued. Simple sub-fields of complex collections are also
   * multi-valued, and therefore cannot be sortable. This is true whether it's an immediate parent
   * field, or an ancestor field, that's the complex collection. The default for sortable is false.
   */
  sortable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in facet queries. Typically
   * used in a presentation of search results that includes hit count by category (for example,
   * search for digital cameras and see hits by brand, by megapixels, by price, and so on).
   * Fields of type Edm.GeographyPoint or Collection(Edm.GeographyPoint) cannot be facetable.
   * Default is false for all other simple fields.
   */
  facetable?: boolean;
  /**
   * The name of the language analyzer to use for the field. This option can be used only with
   * searchable fields and it can't be set together with either searchAnalyzer or indexAnalyzer.
   * Once the analyzer is chosen, it cannot be changed for the field.
   * KnownAnalyzerNames is an enum containing known values.
   */
  analyzerName?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at search time for the field. This option can be used only with
   * searchable fields. It must be set together with indexAnalyzer and it cannot be set together
   * with the analyzer option. This analyzer can be updated on an existing field.
   * KnownAnalyzerNames is an enum containing known values.
   */
  searchAnalyzerName?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at indexing time for the field. This option can be used only
   * with searchable fields. It must be set together with searchAnalyzer and it cannot be set
   * together with the analyzer option. Once the analyzer is chosen, it cannot be changed for the
   * field. KnownAnalyzerNames is an enum containing known values.
   */
  indexAnalyzerName?: LexicalAnalyzerName;
  /**
   * A list of the names of synonym maps to associate with this field. This option can be used only
   * with searchable fields. Currently only one synonym map per field is supported. Assigning a
   * synonym map to a field ensures that query terms targeting that field are expanded at
   * query-time using the rules in the synonym map. This attribute can be changed on existing
   * fields.
   */
  synonymMapNames?: string[];
}

export declare type LexicalAnalyzerName = string;


/**
 * Defines values for ComplexDataType.
 * Possible values include: 'Edm.ComplexType', 'Collection(Edm.ComplexType)'
 * @readonly
 */
export declare type ComplexDataType = "Edm.ComplexType" | "Collection(Edm.ComplexType)";

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export declare interface ComplexField {
    /**
     * The name of the field, which must be unique within the fields collection of the index or
     * parent field.
     */
    name: string;
    /**
     * The data type of the field.
     * Possible values include: 'Edm.ComplexType','Collection(Edm.ComplexType)'
     */
    type: ComplexDataType;
    /**
     * A list of sub-fields.
     */
    fields: SearchField[];
}


/**
 * Represents a geographic point in global coordinates.
 */
export declare class GeographyPoint {
  /**
   * The latitude in decimal.
   */
  latitude: number;
  /**
   * The longitude in decimal.
   */
  longitude: number;
  /**
   * Constructs a new instance of GeographyPoint given
   * the specified coordinates.
   * @param geographyPoint - object with longitude and latitude values in decimal
   */
  constructor(geographyPoint: {
      longitude: number;
      latitude: number;
  });
  /**
   * Used to serialize to a GeoJSON Point.
   */
  toJSON(): Record<string, unknown>;
}