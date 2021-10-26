import React, { useEffect } from 'react';
import { Card } from '@components/atoms/card';
import { useDeleteZoneMutation, useLazyGetZonesByConfigurationIdQuery } from '@store/zone.admin.service';
import { useRouter } from 'next/router';
import EditIcon from '@assets/edit.svg';
import DeleteIcon from '@assets/delete.svg';
import AddIcon from '@assets/add.svg';
import { Link } from '@components/atoms/link';

interface Props {
  configurationId: string;
}

export const ConfigurationZones: React.FC<Props> = () => {
  const { query, asPath } = useRouter();
  const [getZones, { data: zones = [] }] = useLazyGetZonesByConfigurationIdQuery();
  const [deleteZone] = useDeleteZoneMutation();

  useEffect(() => {
    getZones(query.id as string);
  }, []);

  const handleDeleteZoneClick = async (id: string) => {
    await deleteZone(id);
    getZones(query.id as string);
  };

  return (
    <Card title="Zones">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.name}</td>
              <td>{zone.type}</td>
              <td>
                <Link href={`/admin/zones/${zone.id}`}><EditIcon /></Link>
                <Link href={asPath} onClick={() => handleDeleteZoneClick(zone.id)}>
                  <DeleteIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/admin/zones/create?type=configuration&id=${query.id}`} button>
        <AddIcon />
        Add Zone
      </Link>
    </Card>
  );
};
