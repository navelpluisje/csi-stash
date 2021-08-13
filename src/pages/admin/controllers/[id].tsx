/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const { query, push } = useRouter();
  const [controller, setController] = useState<Record<string, any>>();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/controller/${query.id}`)
      .then((res) => res.json())
      .then((result) => {
        setController(result);
        setLoading(false);
      });
  }, [query]);

  const onSubmit = async (values: Record<string, string>) => {
    await fetch(
      `/api/admin/controller/${query.id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
      },

    );
    push('/admin/controllers');
  };

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Edit Controller</title>
      </Head>

      <h4>Edit controller</h4>
      {loading && <div>loading&hellip;</div>}
      {controller && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('id')} type="hidden" defaultValue={controller[0].id} />
          <div>
            <label htmlFor="brand">Brand</label>
            <input {...register('brand')} id="brand" defaultValue={controller[0].brand} />
          </div>
          <div>
            <label htmlFor="model">Model</label>
            <input {...register('model')} id="model" defaultValue={controller[0].model} />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
      <p><a href="/admin/controllers">Controllers</a></p>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
