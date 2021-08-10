// import { NextApiRequest, NextApiResponse } from 'next';
import { PSDB } from 'planetscale-node';

const conn = new PSDB('main');

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async () => {
  // const {
  //   body: { brand, model },
  //   method,
  // } = req;
  console.log(conn);
  const [rows, fields] = await conn.query('select brand, model from controller', {});
  console.log(rows, fields);
  // switch (method) {
  //   case 'POST':
  //     const [rows, fields] = await conn.query(
  //       `insert into controller (brand, model) values ('${brand}', '${model}')`,
  //     );
  //     res.statusCode = 201;
  //     res.json({ brand, model });
  //     break;
  //   case 'GET':
  //     try {
  //       const [getRows, _] = await conn.query('select * from controller', {});
  //       res.statusCode = 200;
  //       res.json(getRows);
  //     } catch (e) {
  //       console.log(e);
  //       const error = new Error('An error occurred while connecting to the database');
  //       error.status = 500;
  //       error.info = { message: 'An error occurred while connecting to the database' };
  //       throw error;
  //     }

  //     break;
  //   default:
  //     res.setHeader('Allow', ['GET', 'PUT']);
  //     res.status(405).end(`Method ${method} Not Allowed`);
  // }
};
