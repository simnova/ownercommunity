import { IBlobStorage } from '../blob-storage';
import archiver from 'archiver';
import internal, { Stream } from 'stream';


export class BlobZip {
  private readonly blobStorage: IBlobStorage;
  public constructor(blobStorage: IBlobStorage) {
    this.blobStorage = blobStorage;
  }

  public async zipBlobs(containerName: string, blobNames: string[], zipName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      var isComplete = false;
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
          isComplete = true;
          resolve();
        })
        .catch((err) => {
          console.log('writeStreamToBlob failed', err);
          isComplete = true;
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
        .then(() => {
          archive.finalize();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
