/* eslint-disable camelcase */
export const getConfigurationsByControllerId = (id: string) => `
  SELECT
    id,
    name,
    description,
    controller_id,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    controller_id = ${id}
`;

export const getConfigurationById = (id: string) => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    id = ${id}
`;

export const getAdminConfigurationById = (id: string) => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    id = ${id}
`;

export const getAdminConfigurationsByControllerId = (id: string) => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    controller_id = ${id}
`;

export const getAdminConfigurations = () => `
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

interface insertConfigurationValues {
  name: string;
  description: string;
  controller_id: number;
  author_id: number;
}

export const insertConfiguration = ({
  name, description, controller_id, author_id,
}: insertConfigurationValues) => `
  INSERT INTO
    configuration (name, description, controller_id, author_id, file, filename)
  VALUES
    ('${name}', '${description}', ${controller_id}, ${author_id}, '', '')
`;

interface updateConfigurationValues {
  name: string;
  description: string;
  // author_id: number;
}

const getUpdateValue = (value: string) => {
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    return value;
  }
  return `'${value}'`;
};

export const updateConfiguration = (values: updateConfigurationValues, id: string) => (`
  UPDATE
    configuration
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
