import { BlobStorageDomain } from '../../src/app/domain/infrastructure/blob-storage/interfaces';
import archiver from 'archiver';
import internal from 'stream';


export class BlobZip {
  private readonly blobStorage: BlobStorageDomain;
  public constructor(blobStorage: BlobStorageDomain) {
    this.blobStorage = blobStorage;
  }

  public async zipBlobs(containerName: string, blobNames: string[], zipName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      const output = new internal.PassThrough({
        allowHalfOpen: true,
        readableObjectMode: true,
        writableObjectMode: true,
      });
      this.blobStorage
        .writeStreamToBlob(zipName, containerName, output, 'application/zip')
        .then(() => {
          console.log('writeStreamToBlob completed');
          resolve();
        })
        .catch((err) => {
          console.log('writeStreamToBlob failed', err);
          reject(err);
        });

      archive.pipe(output);

      Promise.all(
        blobNames.map((blobName) => {
          return this.blobStorage
            .readStreamFromBlob(blobName, containerName)
            .then((blobStream) => {
              archive.append(blobStream as internal.Readable, { name: blobName });
            })
            .catch((err) => {
              console.log(err);
            });
        })
      )
        .then(async () => {
          await archive.finalize();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
