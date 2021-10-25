import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import { useAddControllerMutation } from '@store/controller.admin.service';
import { useRouter } from 'next/router';
import { FormInput } from '@components/atoms/formInput';
import { FileUpload } from '@components/atoms/fileUpload';

const Admin = () => {
  const { push } = useRouter();
  const [addController, {
    isLoading, isUninitialized, isSuccess,
  }] = useAddControllerMutation();
  const {
    handleSubmit, setValue, control, register, watch,
  } = useForm();

  const onSubmit = async (values: Record<string, string>) => {
    addController({ body: values });
  };

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      push('/admin/controllers');
    }
  }, [isSuccess, isUninitialized]);

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Create Controller</title>
      </Head>

      <Card title="Create new controller">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('file')} type="hidden" />
          <input {...register('filename')} type="hidden" />
          <FormInput
            control={control}
            name="brand"
            label="Brand"
            rules={{
              required: 'Brand is required',
            }}
          />
          <FormInput
            control={control}
            name="model"
            label="Model"
            rules={{
              required: 'Model is required',
            }}
          />
          <FileUpload
            label="MST-file"
            watch={watch}
            setValue={setValue}
            accept=".mst, .txt"
          />
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
