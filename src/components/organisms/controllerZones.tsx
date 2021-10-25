import React from 'react';
import { Card } from '@components/atoms/card';
import { useGetZonesByControllerIdQuery } from '@store/zone.admin.service';
import { useRouter } from 'next/router';
import EditIcon from '@assets/edit.svg';
import DeleteIcon from '@assets/delete.svg';
import AddIcon from '@assets/add.svg';
import { Link } from '@components/atoms/link';

interface Props {
  controllerId: string;
}

export const ControllerZones: React.FC<Props> = () => {
  const { query } = useRouter();
  const {
    data: zones = [],
  } = useGetZonesByControllerIdQuery(query.id as string);

  return (
    <Card title="Zones">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>type</th>
            <th>author</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.name}</td>
              <td>{zone.type}</td>
              <td>{zone.author}</td>
              <td>
                <Link href={`/admin/zones/${zone.id}`}><EditIcon /></Link>
                <Link href={`/admin/controllers/${query.id}/zoneurations/${zone.id}`}><DeleteIcon /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/admin/zones/create?type=controller&id=${query.id}`} button>
        <AddIcon />
        Add Zone
      </Link>
    </Card>
  );
};