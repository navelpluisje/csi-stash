/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { deleteZoneFileById } from '@queries/zonefiles';

const conn = new PSDB('main');

const ZoneFileById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
    method,
  } = req;

  switch (method) {
    case 'DELETE': {
      await conn.query(
        deleteZoneFileById(query.id as string),
        {},
      );

      res.statusCode = 201;
      res.json({});
      break;
    }

    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(ZoneFileById);
