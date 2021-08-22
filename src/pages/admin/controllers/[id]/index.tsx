/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Page } from '@components/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Card } from '@components/card';
import { Link } from '@components/atoms/link';
import { useGetControllerByIdQuery, useUpdateControllerMutation } from '@store/controller.admin.service';
import { useGetConfigurationsByControllerIdQuery } from '@store/configuration.admin.service';
import { readFileContent } from '@utils/readFileContent';

const Admin = () => {
  const { query, push } = useRouter();
  const { data = [], isLoading } = useGetControllerByIdQuery(parseInt(query.id as string, 10));
  const {
    data: configurations = [],
    // isLoading,
  } = useGetConfigurationsByControllerIdQuery(query.id as string);
  const [updateController, {
    isLoading: isUpdating, isUninitialized, isSuccess,
  }] = useUpdateControllerMutation();
  const {
    register, handleSubmit, setValue, watch,
  } = useForm();

  const filename = watch('filename');
  const file = watch('file');

  useEffect(() => {
    if (setValue && data.length > 0) {
      setValue('id', query.id);
      setValue('brand', data[0].brand);
      setValue('model', data[0].model);
      setValue('file', data[0].file);
      setValue('filename', data[0].filename);
    }
  }, [data, setValue]);

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
      setValue('filename', uploadFile.name);
    }
  };

  const onSubmit = async (values: Record<string, string>) => {
    updateController({
      id: parseInt(query.id as string, 10),
      body: values,
    });
    // push('/admin/controllers');
  };

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Edit Controller</title>
      </Head>

      <section>
        <Card title="View/Edit Controller">
          {isLoading && <div>loading&hellip;</div>}
          {data.length > 0 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register('id')} type="hidden" />
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
              <button type="submit" disabled={isUpdating}>Save</button>
            </form>
          )}
        </Card>
        <Card title="Configurations">
          {configurations.map((config) => (
            <div>{config.name}</div>
          ))}
          <Link href={`/admin/controllers/${query.id}/configurations`} button>Add Configuration</Link>
        </Card>
      </section>
      <section>
        <h4>A little Help</h4>
        <h5>Edit the controller</h5>
        <p>
          Just change the brand and/or model of the controller and press the
          &lsquo;Save&rsquo;-button.
        </p>
        <h5>Configurations</h5>
        <p>
          What is a controller without any CSI configurations. All configurations need to be
          working with the *.mst file of the controller. This way we can make configurations
          easier to maintain and interchangable.
        </p>
        <p>
          Press the &lsquo;Add configuration&rsquo;-button to create a new configuration,
          or edit an existing one.
        </p>
      </section>
      <p><Link href="/admin/controllers">Controllers</Link></p>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
