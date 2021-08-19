import { getControllerById } from '@queries/controllers';
import { NextApiRequest, NextApiResponse } from 'next';
// import { PSDB } from 'planetscale-node';
import { fetchQuery } from 'src/utils/fetchData';

// const conn = new PSDB('main');

const Controllers = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await fetchQuery(getControllerById(parseInt(query.id as string, 10)));
        console.log({ result });
        res.statusCode = 200;
        res.json(result);
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
