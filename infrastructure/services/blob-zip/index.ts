import { IBlobStorage } from "../blob-storage";
import archiver from "archiver";
import internal, { Stream } from "stream";

//const archiver = require('archiver');

export class BlobZip {
    private readonly blobStorage: IBlobStorage;
    public constructor(blobStorage: IBlobStorage) {
        this.blobStorage = blobStorage;
    }

    public async zipBlobs(containerName: string, blobNames: string[], zipName: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
 

      var isComplete = false;
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
     // const output = new internal.Readable();
      const output = new internal.PassThrough({
        allowHalfOpen: true,
        readableObjectMode: true,
        writableObjectMode: true

      });
      //output.push(null);
     this.blobStorage.writeStreamToBlob(zipName, containerName, output, 'application/zip').then(() => {
        console.log('writeStreamToBlob completed');
        isComplete = true;
        resolve();
      }).catch((err) => {
        console.log('writeStreamToBlob failed', err);
        isComplete = true;
        reject(err);
      });
 

      const input = new internal.Writable();
     // buffer.pipe(input) //.pipe(output);
    //  output.pipe(input);
   //   const output: internal.PassThrough = new Stream.PassThrough({allowHalfOpen: true});
    //  const input = new internal.PassThrough({allowHalfOpen: true});
      input.on('finish', () => {
        console.log('input finished');
      });
      input.on('drain', () => {
        console.log('input drained');
      });

      output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        
      });
      
      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function() {
        console.log('Data has been drained');
      });
      output.pipe(process.stdout);


      output.on('data', (data: any) => {
        console.log('input data: ' + data);
      });

      output.on('write', (data: any) => {
        console.log('output write: ' + data);
      });


      archive.pipe(output);

      
      //const passThroughReadFromExistingBlob: internal.PassThrough = new internal.PassThrough(); 
     

      archive.append('string cheese!', { name: 'file2.txt' });
     // output.push('string cheese!');
      Promise.all(blobNames.map((blobName) => {
        return this.blobStorage.readStreamFromBlob(blobName, containerName).then((blobStream) => {
          archive.append(blobStream as internal.Readable, { name: blobName });
        }).catch((err) => { console.log(err); });
      })).then(() => {
        archive.finalize();
      }).catch((err) => {
        console.log(err);
      });


    
     // archive.on
   //  
     //await this.blobStorage.writeStreamToBlob(zipName, containerName, input, 'application/zip');

      //archive.finalize();

     //await this.blobStorage.writeStreamToBlob(zipName, containerName, output, 'application/zip');
    
         
      });

  
    }

}