export const update = `
    SELECT
        MAX(modified) as lastUpdated
    FROM (
        SELECT MAX(modified) AS modified from configuration
        UNION
        SELECT MAX(modified) AS modified from controller
        UNION
        SELECT MAX(modified) AS modified from zone
        UNION
        SELECT MAX(modified) AS modified from author
    ) ud
`;
