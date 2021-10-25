/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { insertZone } from '@queries/zones';

const conn = new PSDB('main');

const Zones = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
  } = req;

  const { name, description, type } = !!body && JSON.parse(body);

  switch (method) {
    case 'POST': {
      const result = await conn.query(
        insertZone({
          name,
          description,
          type,
          author_id: 1,
        }),
        {},
      );

      res.statusCode = 200;
      res.json({
        id: result[0].insertId, name, description, author_id: 1,
      });
      break;
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(Zones);
