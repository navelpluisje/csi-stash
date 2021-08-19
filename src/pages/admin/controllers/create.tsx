/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/card';

const Admin = () => {
  const {
    register, handleSubmit, setValue, watch,
  } = useForm();
  const filename = watch('filename');
  const file = watch('file');

  const onSubmit = async (values: Record<string, string>) => {
    await fetch(
      '/api/pscale/controller', {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );
  };

  function readFileContent(fileContent: File) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const { target } = event;
        if (target) {
          resolve(target.result);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(fileContent);
    });
  }

  const handleUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const uploadFile = target.files ? target.files[0] : null;
    if (uploadFile) {
      const fileContent = await readFileContent(uploadFile);
      setValue('file', fileContent);
      setValue('filename', file.name);
    }
  };

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Create Controller</title>
      </Head>

      <Card title="Create new controller">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="brand">Brand</label>
            <input {...register('brand')} id="brand" />
          </div>
          <div>
            <label htmlFor="model">Model</label>
            <input {...register('model')} id="model" />
          </div>
          <div>
            <label htmlFor="file">Mst file</label>
            <label className="button button-outline upload-button">
              {/* @ts-ignore */}
              <input id="upload" type="file" onChange={handleUpload} />
              Select MST-file
            </label>
            {filename}
            <pre><code>{file }</code></pre>
          </div>
          <button type="submit">Save</button>
        </form>
      </Card>
      <section>
        <h4>A little help</h4>
        <p>
          Here you can create a new controller. A controller is just the hardware device.
          You only have to provide a brand and model.
        </p>
        <p>
          After adding a controller let xxxxxx know about it, so an image can be added
          for the newly added controller
        </p>
      </section>
      <p><a href="/admin/controllers">Controllers</a></p>

    </Page>
  );
};

export default withPageAuthRequired(Admin);
