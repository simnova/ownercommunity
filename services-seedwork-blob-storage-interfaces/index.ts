export interface FileInfo {
  name: string;
  url: string;
  size?: number;
  type?: string;
  tags?: Record<string, string>;
}

export interface BlobRequestSettings { 
  fileSizeBytes?:number;
  mimeType?:string;
  tags?:Record<string,string>;
  metadata?:Record<string,string>;
}

export type BlobAuthHeader = {
  authHeader?: string;
  blobName?: string;
  blobPath?: string;
  indexTags?: BlobIndexTag[];
  metadataFields?: BlobMetadataField[];
  requestDate?: string;
};

export type BlobIndexTag = {
  name: string;
  value: string;
};

export type BlobMetadataField = {
  name: string;
  value: string;
};