/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getZonesByController } from '@queries/zones';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

const ControllerZones = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query,
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        if (query.id === 'NaN') {
          res.statusCode = 200;
          res.json([]);
          return;
        }
        const [result] = await conn.query(
          getZonesByController(query.id as string), {},
        );
        res.statusCode = 200;
        res.json(result);
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

export default ControllerZones;
