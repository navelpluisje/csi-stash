/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { addZoneToParent } from '@queries/zones';

const conn = new PSDB('main');

const ZoneParents = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
  } = req;

  const { parentId, zoneId, type } = !!body && JSON.parse(body);

  switch (method) {
    case 'POST': {
      const result = await conn.query(
        addZoneToParent({
          parentId,
          zoneId,
          type,
        }),
        {},
      );

      res.statusCode = 200;
      res.json({
        id: result[0].insertId, parentId, zoneId, type,
      });
      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(ZoneParents);
