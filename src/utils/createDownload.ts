import fs from 'fs';
import archiver from 'archiver';

export const createDownload = (controller: any) => {
  const filename = Date.now();
  const output = fs.createWriteStream(`${__dirname}/${filename}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on('close', () => {
    fs.unlink(`${__dirname}/${filename}.zip`, () => {});
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

  archive.append(controller.file, { name: 'Surfaces/Midi/controller.mst' });
  archive.append('', { name: `Zones/${controller.brand}-${controller.model}/base.zon` });
  archive.append('', { name: `Zones/${controller.brand}-${controller.model}/channel.zon` });

  archive.finalize();

  return archive;
};
