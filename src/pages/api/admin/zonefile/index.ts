/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { insertZoneFile } from '@queries/zonefiles';

const conn = new PSDB('main');

const ZoneFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
  } = req;

  const {
    filename, file, zoneId,
  } = !!body && JSON.parse(body);

  switch (method) {
    case 'POST': {
      const result = await conn.query(
        insertZoneFile({
          filename,
          file,
          zoneId,
        }),
        {},
      );

      res.statusCode = 200;
      res.json({
        id: result[0].insertId, filename, file, zone_id: zoneId,
      });
      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(ZoneFiles);
