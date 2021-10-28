export const getFilesByZone = (id: string): string => `
  SELECT
    id,
    filename,
    zone_id
  FROM
    zone_file
  WHERE
    zone_id = ${id}
`;

interface insertZoneFileValues {
  filename: string;
  file: string;
  zoneId: number;
}

export const insertZoneFile = ({
  filename, file, zoneId,
}: insertZoneFileValues): string => `
  INSERT INTO
    zone_file (filename, file, zone_id)
  VALUES
    ('${filename}', '${file}', ${zoneId});
`;

export const deleteZoneFileById = (id: string): string => `
  DELETE FROM
    zone_file
  WHERE
    id = ${id}
`;
