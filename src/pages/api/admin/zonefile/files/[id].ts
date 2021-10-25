/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { getFilesByZone } from '@queries/zonefiles';

const conn = new PSDB('main');

const ZoneFilesByZone = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const [getRows] = await conn.query(
          getFilesByZone(query.id as string),
          {},
        );
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

export default withApiAuthRequired(ZoneFilesByZone);
