import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import { useUpdateZoneMutation, useGetZoneByIdQuery } from '@store/zone.admin.service';
import { useRouter } from 'next/router';
import { FormInput } from '@components/atoms/formInput';
import { FormSelect } from '@components/atoms/formSelect';
import SaveIcon from '@assets/save.svg';
import { ZoneFileForm } from '@components/organisms/zoneFileForm';
import { PluginTypes } from '@constants';

const Admin = () => {
  const { query } = useRouter();
  const { data = [], isLoading } = useGetZoneByIdQuery(parseInt(query.id as string, 10));
  const [updateZone] = useUpdateZoneMutation();
  const {
    handleSubmit, control, register, setValue,
  } = useForm();

  useEffect(() => {
    if (setValue && data.length > 0) {
      setValue('id', query.id);
      setValue('name', data[0].name);
      setValue('description', data[0].description);
      setValue('type', data[0].type);
    }
  }, [data, setValue]);

  const onSubmit = async (values: Record<string, string>) => {
    await updateZone({ body: values });
  };

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Edit Zone</title>
      </Head>

      <Card title="Edit zone">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('id')} type="hidden" />
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
          <FormSelect
            control={control}
            name="type"
            label="Type"
            rules={{
              required: 'Type is required',
            }}
          >
            <option value="">Select a type</option>
            <option value="base">Base</option>
            <option value="effects">Effect</option>
            <option value="instruments">Instrument</option>
          </FormSelect>
          <FormSelect
            control={control}
            name="plugin_type"
            label="Plugin Type"
          >
            <option value="">Select a type</option>
            {Object.values(PluginTypes).map((value) => (
              <option value={value}>{value}</option>
            ))}
          </FormSelect>
          <button type="submit" disabled={isLoading}>
            <SaveIcon />
            Save
          </button>
        </form>
      </Card>
      <section>
        <Card title="Files">
          Add a zone
          <ZoneFileForm zoneId={query.id as string} />
        </Card>
        <h4>A little help</h4>
        <p>
          Here you can create a new zone. After saving the data you can start adding the files.
        </p>
      </section>
      <p><Link href="/admin/controllers">Controllers</Link></p>

    </Page>
  );
};

export default withPageAuthRequired(Admin);
