import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import {
  useGetConfigurationByIdQuery, useUpdateConfigurationMutation,
} from '@store/configuration.admin.service';
import { useRouter } from 'next/router';
import { AddZoneForm } from '@components/organisms/addZoneForm';
import { ZoneList } from '@components/organisms/zoneList';
import { FormInput } from '@components/atoms/formInput';

const Admin = () => {
  const { query, push } = useRouter();
  const {
    data = [],
    isLoading,
  } = useGetConfigurationByIdQuery(parseInt(query.config_id as string, 10));
  const [updateConfiguration, {
    isUninitialized, isSuccess,
  }] = useUpdateConfigurationMutation();
  const {
    handleSubmit, setValue, control,
  } = useForm();

  useEffect(() => {
    if (setValue && data.length > 0) {
      setValue('id', query.config_id);
      setValue('name', data[0].name);
      setValue('description', data[0].description);
    }
  }, [data, setValue]);

  const onSubmit = async (values: Record<string, string>) => {
    updateConfiguration({ id: query.config_id as string, body: values });
  };

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      push(`/admin/controllers/${query.id}`);
    }
  }, [isSuccess, isUninitialized]);

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Edit Configuration</title>
      </Head>

      <section>
        <Card title="Edit controller">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                required: 'Description is required',
              }}
            />
            <button type="submit" disabled={isLoading}>Save</button>
          </form>
        </Card>
        <Card title="Files">
          <ZoneList zones={[{ name: 'fileName.zon' }]} />
          <AddZoneForm />
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
