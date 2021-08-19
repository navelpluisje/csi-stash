import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [controllers, setControllers] = useState<Array<any>>([]);
  const x = useUser();

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/controller')
      .then((res) => res.json())
      .then((result) => {
        setControllers(result);
        setLoading(false);
      });
  }, []);

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Admin</title>
      </Head>
      {console.log(x)}
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
          {loading && <tr><td colSpan={7}>Loading&hellip;</td></tr>}
          {controllers.length > 0 && controllers.map((controller) => (
            <tr key={controller.id}>
              <td>{controller.id}</td>
              <td>{controller.brand}</td>
              <td>{controller.model}</td>
              <td>{controller.author}</td>
              <td>{controller.created}</td>
              <td>{controller.modified}</td>
              <td>
                <a href={`/admin/controllers/${controller.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/admin/controllers/create" className="button">Add new controller</a>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
