import React from 'react';
import { Card } from '@components/atoms/card';
import { useGetConfigurationsByControllerIdQuery } from '@store/configuration.admin.service';
import { useRouter } from 'next/router';
import EditIcon from '@assets/edit.svg';
import DeleteIcon from '@assets/delete.svg';
import AddIcon from '@assets/add.svg';
import { Link } from '@components/atoms/link';

interface Props {
  controllerId: string;
}

export const ControllerConfigurations: React.FC<Props> = () => {
  const { query } = useRouter();
  const {
    data: configurations = [],
  } = useGetConfigurationsByControllerIdQuery(query.id as string);

  return (
    <Card title="Configurations">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((config) => (
            <tr key={config.id}>
              <td>{config.name}</td>
              <td>{config.author}</td>
              <td>
                <Link href={`/admin/configurations/${config.id}`}><EditIcon /></Link>
                <Link href={`/admin/configurations/${config.id}`}><DeleteIcon /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/admin/configurations/create/${query.id}`} button>
        <AddIcon />
        Add Configuration
      </Link>
    </Card>
  );
};
