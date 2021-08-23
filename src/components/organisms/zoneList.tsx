import React from 'react';

interface Props {
  zones: Array<Record<string, string>>
}

export const ZoneList: React.FC<Props> = ({ zones = [] }) => {
  const deleteZone = () => {
    console.log('delete');
  };

  return (
    <ul className="zone-list">
      {zones.map((zone) => (
        <li key={zone.name}>
          <h4>{zone.name}</h4>
          <div className="actions">
            <button
              type="button"
              className="button-outline"
              onClick={deleteZone}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
