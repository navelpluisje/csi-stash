/* eslint-disable camelcase */
export const getControllers = () => `
  SELECT 
    id,
    brand, 
    model, 
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = id) as configurations
  FROM 
    controller
`;

export const getControllerById = (id: string) => `
  SELECT 
    id,
    brand, 
    model, 
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = ${id}) as configurations
  FROM 
    controller
  WHERE
    id=${id}
`;

export const getAdminControllers = () => `
  SELECT 
    id,
    brand, 
    model, 
    created,
    modified,
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = id) as configurations
  FROM 
    controller
`;

export const getAdminControllerById = (id: number) => `
  SELECT 
    brand, 
    model, 
    file,
    filename,
    created,
    modified,
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = id) as configurations
  FROM 
    controller
  WHERE
    id=${id}
`;

interface insertControllerValues {
  brand: string;
  model: string;
  author_id: number;
}

export const insertController = ({ brand, model, author_id }: insertControllerValues) => `
  INSERT INTO 
    controller (brand, model, author_id) 
  VALUES 
    ('${brand}', '${model}', ${author_id})
`;

interface updateControllerValues {
  brand?: string;
  model?: string;
  file?: string;
  filename?: string;
  author_id?: number;
}

const getUpdateValue = (value: string) => {
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    return value;
  }
  return `'${value}'`;
};

export const updateController = (values: updateControllerValues, id: number) => (`
  UPDATE 
    controller 
  SET 
    ${Object.entries(values).reduce((acc, [key, value], currentIndex, array) => {
    let result = `${acc}${key}=${getUpdateValue(value)}`;
    if (currentIndex !== array.length - 1) {
      result += ',';
    }
    return result;
  }, '')}
  WHERE
    id=${id}
`);
