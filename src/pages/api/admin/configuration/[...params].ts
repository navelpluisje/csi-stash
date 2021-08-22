import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { PSDB } from 'planetscale-node';
import {
  getAdminConfigurationById,
  getAdminConfigurationsByControllerId,
  updateConfiguration,
} from '@queries/configurations';

const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    query,
    method,
  } = req;
  const {
    name, description,
  } = body && JSON.parse(body);

  switch (method) {
    case 'PUT':
      await conn.query(
        updateConfiguration({
          name,
          description,
        }, query.id as string),
        {},
      );
      res.statusCode = 201;
      res.json({ brand: req.body.brand, model: req.body.model });
      break;
    case 'GET':
      try {
        const [getRows] = await conn.query(
          query.params.length === 1
            ? getAdminConfigurationById(query.params[0] as string)
            : getAdminConfigurationsByControllerId(query.params[1] as string),
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
