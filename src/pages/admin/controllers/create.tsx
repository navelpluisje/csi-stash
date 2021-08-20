/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Page } from '@components/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/card';
import { Link } from '@components/atoms/link';
import { readFileContent } from '@utils/readFileContent';
import { useAddControllerMutation } from '@store/controller.admin.service';
import { useRouter } from 'next/router';

const Admin = () => {
  const { push } = useRouter();
  const [addController, {
    isLoading, isUninitialized, isSuccess,
  }] = useAddControllerMutation();
  const {
    register, handleSubmit, setValue, watch,
  } = useForm();
  const filename = watch('filename');
  const file = watch('file');

  const onSubmit = async (values: Record<string, string>) => {
    addController({ body: values });
  };

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      push('/admin/controllers');
    }
  }, [isSuccess, isUninitialized]);

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
          <button type="submit" disabled={isLoading}>Save</button>
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
      <p><Link href="/admin/controllers">Controllers</Link></p>

    </Page>
  );
};

export default withPageAuthRequired(Admin);
