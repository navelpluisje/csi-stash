import { update } from '@queries/update';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const [getRows] = await conn.query(update, {});
        res.statusCode = 200;

        res.json(getRows[0]);
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