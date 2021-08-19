/* eslint-disable camelcase */
export const getConfigurations = () => `
  SELECT 
    brand, 
    model, 
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = id) as configurations
  FROM 
    controller
`;

export const getAdminConfigurations = () => `
  SELECT 
    brand, 
    model, 
    created,
    modified,
    (SELECT name FROM author WHERE id = author_id) as author,
    (SELECT count(id) FROM configuration WHERE controller_id = id) as configurations
  FROM 
    controller
`;
