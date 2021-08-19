import { PSDB } from 'planetscale-node';
import { base64Encode } from '@utils/base64';

const conn = new PSDB('main');
const regExpSelect = /SELECT/i;

export const fetchQuery = async (query: string) => {
  if (regExpSelect.test(query)) {
    const key = base64Encode(query);
    try {
      // const result = localStorage.getItem(key);
      if (result) {
        // return JSON.parse(result);
      }
    } catch (e) {
      alert(e);
    }
  }
  console.log(query);
  // const [queryResponse] = await conn.query(query, {});
  // return queryResponse;
};
