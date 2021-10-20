/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAdminConfigurationById } from '@queries/configurations';
import { getAdminControllerById } from '@queries/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSDB } from 'planetscale-node';
import { createDownload } from '@utils/createDownload';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const [controller, configuration] = await Promise.all([
          conn.query(getAdminControllerById(1), {}),
          conn.query(getAdminConfigurationById('1'), {}),
        ]);

        const download = createDownload(controller[0][0]);

        console.log(configuration);

        // const dir = './tmp/but/then/nested';

        // if (!fs.existsSync(dir)) {
        //   fs.mkdirSync(dir, { recursive: true });
        // }
        // fs.writeFile('tmp/controller.mst', controller[0][0].file, () => {});

        // const buffer = Buffer.from(controller[0][0].file);
        // console.log({ x: controller[0], y: configuration[0] });
        res.statusCode = 200;

        res.send(download);
      } catch (e) {
        const error = new Error('An error occurred while connecting to the database');
        // @ts-ignore
        error.status = 500;
        // @ts-ignore
        error.info = { message: 'An error occurred while connecting to the database' };
        throw error;
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default Controllers;
