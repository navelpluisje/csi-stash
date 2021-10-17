/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import { getAdminControllerById, updateController } from '@queries/controllers';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    query,
    method,
  } = req;
  const {
    brand, model, file, filename,
  } = body && JSON.parse(body);

  switch (method) {
    case 'PUT':
      await conn.query(
        updateController({
          brand,
          model,
          file,
          filename,
          author_id: 1,
        }, parseInt(query.id as string, 10)),
        {},
      );
      res.statusCode = 201;
      res.json({ brand: req.body.brand, model: req.body.model });
      break;
    case 'GET':
      try {
        const [getRows] = await conn.query(
          getAdminControllerById(parseInt(query.id as string, 10)),
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
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withApiAuthRequired(Controllers);
