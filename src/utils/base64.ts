export const base64Encode = (value: string) => {
  const buff = Buffer.from(value, 'utf-8');
  const base64 = buff.toString('base64');

  return base64;
};

export const base64Decode = (value: string) => {
  const buff = Buffer.from(value, 'base64');
  const base64 = buff.toString('utf-8');

  return base64;
};
