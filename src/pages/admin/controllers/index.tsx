import React from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Link } from '@components/atoms/link';
import { useGetAllControllersQuery, usePrefetch } from '@store/controller.admin.service';
import EditIcon from '@assets/edit.svg';
import { Card } from '@components/atoms/card';
import { formatDateTime } from '@utils/format/dateTime';

const Admin = () => {
  const { data = [], isLoading } = useGetAllControllersQuery();
  const prefetchController = usePrefetch('getControllerById');

  const prefetch = (id: number) => {
    prefetchController(id);
  };

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Admin Controllers</title>
      </Head>

      <Card title="Controllers">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Author</th>
              <th>Created</th>
              <th>Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={7}>Loading&hellip;</td></tr>}
            {data.length > 0 && data.map((controller) => (
              <tr key={controller.id}>
                <td>{controller.id}</td>
                <td>{controller.brand}</td>
                <td>{controller.model}</td>
                <td>{controller.author}</td>
                <td>{formatDateTime(controller.created)}</td>
                <td>{formatDateTime(controller.modified)}</td>
                <td>
                  <Link
                    href={`/admin/controllers/${controller.id}`}
                    onMouseOver={() => prefetch(controller.id)}
                    onFocus={() => prefetch(controller.id)}
                  >
                    <EditIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/admin/controllers/create" button>Add new controller</Link>
      </Card>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
