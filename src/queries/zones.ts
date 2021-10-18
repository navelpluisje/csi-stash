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
    (SELECT name FROM author WHERE id = author_id) as author,
  FROM
    zone
  WHERE
    id=${id}
`;
