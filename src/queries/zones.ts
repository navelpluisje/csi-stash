import { ZoneType } from '@store/zone/types';

/* eslint-disable camelcase */
export const getZonesByConfiguration = (id: string): string => `
  SELECT
    z.id,
    z.name,
    z.description,
    z.type,
    (SELECT name FROM author WHERE id = author_id) as author,
    c.id as configuration_id
  FROM
    zone z JOIN configuration_has_zones c ON z.id = c.zone_id
  WHERE
    c.configuration_id = ${id}
`;

export const getZoneById = (id: string): string => `
  SELECT
    z.id,
    z.name,
    z.description,
    z.type,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    zone
  WHERE
    id=${id}
`;

export const getZonesByController = (id: string): string => `
  SELECT
    z.id,
    z.name,
    z.description,
    z.type,
    (SELECT name FROM author WHERE id = author_id) as author,
    c.id as controller_id
  FROM
    zone z JOIN controller_has_zones c ON z.id = c.zone_id
  WHERE
    c.controller_id = ${id}
`;

export const getAdminZoneById = (id: string): string => `
  SELECT
    z.id,
    z.name,
    z.description,
    z.type,
    z.created,
    z.modified,
    (SELECT name FROM author WHERE id = author_id) as author
  FROM
    zone z
  WHERE
    id=${id}
`;

interface insertZoneValues {
  name: string;
  description: string;
  author_id: number;
  type: ZoneType;
}

export const insertZone = ({
  name, description, author_id, type,
}: insertZoneValues): string => `
  INSERT INTO
    zone (name, description, author_id, type)
  VALUES
    ('${name}', '${description}', ${author_id}, '${type}');
`;

interface addZoneToParentArgs {
  zoneId: string;
  parentId: string;
  type: 'controller' | 'configuration';
}

export const addZoneToParent = ({
  zoneId, parentId, type,
}: addZoneToParentArgs): string => `
  INSERT INTO
    ${type}_has_zones (${type}_id, zone_id)
  VALUES
    (${parentId}, ${zoneId})
`;

const getUpdateValue = (value: string) => {
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    return value;
  }
  return `'${value}'`;
};

export const updateZone = (values: insertZoneValues, id: number): string => `
  UPDATE
    zone
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
`;

export const getLastZoneId = 'SELECT MAX(id) as id FROM zone';
