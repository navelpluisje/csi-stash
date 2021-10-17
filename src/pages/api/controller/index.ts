/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getControllers } from '@queries/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const [getRows] = await conn.query(getControllers(), {});
        res.statusCode = 200;

        res.json(getRows);
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
