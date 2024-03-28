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