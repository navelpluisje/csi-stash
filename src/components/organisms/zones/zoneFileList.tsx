import React, { useEffect } from 'react';
import { useLazyGetFilesByZoneIdQuery, useDeleteZoneFileMutation } from '@store/zoneFile.admin.service';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/delete.svg';
import { Link } from '@components/atoms/link';

interface Props {
  zoneId: string;
}

export const ZoneFileList: React.FC<Props> = ({ zoneId }) => {
  const { asPath } = useRouter();
  const [getZoneFiles, { data: zonefiles = [] }] = useLazyGetFilesByZoneIdQuery();
  const [deleteFile] = useDeleteZoneFileMutation();

  const handleDeleteIconClick = async (id: number) => {
    await deleteFile(id);
    getZoneFiles(zoneId);
  };

  useEffect(() => {
    getZoneFiles(zoneId);
  }, []);

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
              <Link href={asPath} onClick={() => handleDeleteIconClick(zonefile.id)}>
                <DeleteIcon />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
