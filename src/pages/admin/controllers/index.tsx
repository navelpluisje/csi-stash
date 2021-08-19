import React from 'react';
import { Page } from '@components/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Link } from '@components/atoms/link';
import { useGetAllControllersQuery, usePrefetch } from '@store/controller.admin.service';

const Admin = () => {
  const { data = [], isLoading } = useGetAllControllersQuery();
  const prefetchController = usePrefetch('getControllerById');

  const prefetch = (id: number) => {
    prefetchController(id);
  };

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Admin</title>
      </Head>
      <h4>Controllers</h4>
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
              <td>{controller.created}</td>
              <td>{controller.modified}</td>
              <td>
                <Link
                  href={`/admin/controllers/${controller.id}`}
                  onMouseOver={() => prefetch(controller.id)}
                  onFocus={() => prefetch(controller.id)}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin/controllers/create" button>Add new controller</Link>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
