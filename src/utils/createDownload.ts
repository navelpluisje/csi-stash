// require modules
import fs from 'fs';
import archiver from 'archiver';

export const createDownload = (controller: any) => {
  const output = fs.createWriteStream(`${__dirname}/example.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log('archiver has been finalized and the output file descriptor has closed.');
    fs.unlink(`${__dirname}/example.zip`, () => {});
  });

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.append(controller.file, { name: 'controller.mst' });

  archive.finalize();
  // output.end(new Buffer(1048576));

  return archive;
};
