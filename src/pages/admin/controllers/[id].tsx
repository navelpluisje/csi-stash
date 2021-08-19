/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Card } from '@components/card';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [hasData, sethasData] = useState(false);
  const { query, push } = useRouter();
  const {
    register, handleSubmit, setValue, watch,
  } = useForm();

  const filename = watch('filename');
  const file = watch('file');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/controller/${query.id}`)
      .then((res) => res.json())
      .then((result) => {
        setValue('brand', result[0].brand);
        setValue('model', result[0].model);
        setValue('file', result[0].file);
        setValue('filename', result[0].filename);
        setLoading(false);
        sethasData(true);
      });
  }, [query]);

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
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Edit Controller</title>
      </Head>

      <section>
        <Card title="View/Edit Controller">
          {loading && <div>loading&hellip;</div>}
          {hasData && (
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
              <button type="submit">Save</button>
            </form>
          )}
        </Card>
        <Card title="Configurations">
          <button type="submit">Add Configurations</button>
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
      <p><a href="/admin/controllers">Controllers</a></p>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
