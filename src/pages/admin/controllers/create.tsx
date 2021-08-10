/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';

const Admin = () => {
  const {
    register, handleSubmit,
  } = useForm();

  const onSubmit = (values: Record<string, string>) => {
    console.log({ values });
  };

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Admin</title>
      </Head>

      <h4>Create new controller</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="brand">Brand</label>
          <input {...register('brand')} id="brand" />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input {...register('model')} id="model" />
        </div>
        <button type="submit">Save</button>
      </form>
      <p><a href="/admin/controllers">Controllers</a></p>

    </Page>
  );
};

export default withPageAuthRequired(Admin);
