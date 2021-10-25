import React from 'react';
import { useGetFilesByZoneIdQuery } from '@store/zoneFile.admin.service';
import { useRouter } from 'next/router';
import EditIcon from '@assets/edit.svg';
import DeleteIcon from '@assets/delete.svg';
import { Link } from '@components/atoms/link';

interface Props {
  zoneId: string;
}

export const ZoneFileList: React.FC<Props> = ({ zoneId }) => {
  const { query } = useRouter();
  const {
    data: zonefiles = [],
  } = useGetFilesByZoneIdQuery(zoneId);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {zonefiles.map((zonefile) => (
          <tr key={zonefile.id}>
            <td>{zonefile.filename}</td>
            <td>
              <Link href={`/admin/zonefiles/${zonefile.id}`}><EditIcon /></Link>
              <Link href={`/admin/controllers/${query.id}/zoneurations/${zonefile.id}`}><DeleteIcon /></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
