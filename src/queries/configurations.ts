/* eslint-disable camelcase */
export const getConfigurationsByControllerId = (id: string): string => `
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
    AND deleted = 0
`;

export const getConfigurationById = (id: string): string => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    id = ${id}
    AND deleted = 0
`;

export const getAdminConfigurationById = (id: string): string => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    id = ${id}
    AND deleted = 0
`;

export const getAdminConfigurationsByControllerId = (id: string): string => `
  SELECT
    id,
    name,
    description,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    configuration
  WHERE
    controller_id = ${id}
    AND deleted = 0
`;

export const getAdminConfigurations = (): string => `
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
  WHERE
    deleted = 0
`;

interface insertConfigurationValues {
  name: string;
  description: string;
  controller_id: number;
  author_id: number;
}

export const insertConfiguration = ({
  name, description, controller_id, author_id,
}: insertConfigurationValues): string => `
  INSERT INTO
    configuration (name, description, controller_id, author_id)
  VALUES
    ('${name}', '${description}', ${controller_id}, ${author_id})
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

export const updateConfiguration = (values: updateConfigurationValues, id: string): string => (`
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
