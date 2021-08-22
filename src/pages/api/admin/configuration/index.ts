/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { insertConfiguration } from '@queries/configurations';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
  } = req;
  const { name, description, controller_id } = body && JSON.parse(body);

  switch (method) {
    case 'POST':
      await conn.query(
        insertConfiguration({
          name,
          description,
          controller_id,
          author_id: 1,
        }),
        {},
      );
      res.statusCode = 201;
      res.json({ name, description, author_id: 1 });
      break;
      // case 'GET':
      //   try {
      //     const [getRows] = await conn.query(getAdminControllers(), {});
      //     res.statusCode = 200;
      //     res.json(getRows);
      //   } catch (e) {
      //     const error = new Error('An error occurred while connecting to the database');
      //     // @ts-ignore
      //     error.status = 500;
      //     // @ts-ignore
      //     error.info = { message: 'An error occurred while connecting to the database' };
      //     throw error;
      //   }

    //   break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(Controllers);
