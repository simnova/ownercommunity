// [MG-TBD] MutationStatus should be removed eventually
export type MutationStatus = {
  errorMessage?: string;
  success: boolean;
};

// export type BlobAuthHeader = {
//   authHeader?: string;
//   blobName?: string;
//   blobPath?: string;
//   indexTags?: BlobIndexTag[];
//   metadataFields?: BlobMetadataField[];
//   requestDate?: string;
// };

// export type BlobIndexTag = {
//   name: string;
//   value: string;
// };

// export type BlobMetadataField = {
//   name: string;
//   value: string;
// };

// export type FileInfo = {
//   name: string;
//   size: number;
//   type: string;
//   url: string;
// };