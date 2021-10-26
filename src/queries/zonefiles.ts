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

const getUpdateValue = (value: string) => {
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    return value;
  }
  return `'${value}'`;
};

export const updateZone = (values: insertZoneFileValues, id: number): string => `
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
