/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import { useAddConfigurationMutation } from '@store/configuration.admin.service';
import { useRouter } from 'next/router';
import { FormInput } from '@components/atoms/formInput';

const Admin = () => {
  const { push, query } = useRouter();
  const [addConfiguration, {
    isLoading, isUninitialized, isSuccess,
  }] = useAddConfigurationMutation();
  const {
    register, handleSubmit, control,
  } = useForm();

  const onSubmit = async (values: Record<string, string>) => {
    addConfiguration({ body: values });
  };

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      push('/admin/controllers');
    }
  }, [isSuccess, isUninitialized]);

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Create Configuration</title>
      </Head>

      <section>
        <Card title="Create new configuration">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('controller_id')}
              id="controller_id"
              type="hidden"
              defaultValue={query.controllerId}
            />
            <FormInput
              control={control}
              name="name"
              label="Name"
              rules={{
                required: 'Name is required',
              }}
            />
            <FormInput
              control={control}
              name="description"
              label="Description"
              rules={{
                required: 'Name is required',
              }}
            />
            <button type="submit" disabled={isLoading}>Save</button>
          </form>
        </Card>
      </section>
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
