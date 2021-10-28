import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import { useAddZoneMutation, useAddZoneToParentMutation } from '@store/zone.admin.service';
import { useRouter } from 'next/router';
import { FormInput } from '@components/atoms/formInput';
import { FormSelect } from '@components/atoms/formSelect';
import SaveIcon from '@assets/save.svg';
import { PluginTypes } from '@constants';

const Admin = () => {
  const { push, query } = useRouter();
  const [addZone, {
    data: zone, isLoading, isUninitialized, isSuccess,
  }] = useAddZoneMutation();
  const [addZoneToParent] = useAddZoneToParentMutation();
  const {
    handleSubmit, control,
  } = useForm();
  const { type, id } = query;

  const onSubmit = async (values: Record<string, string>) => {
    await addZone({ body: { ...values } });
  };

  const addToParent = async () => {
    if (!zone) {
      return;
    }

    await addZoneToParent({
      body: {
        type,
        parentId: id,
        zoneId: zone.id,
      },
    });
  };

  useEffect(() => {
    if (!isUninitialized && isSuccess && zone) {
      addToParent();
      push(`/admin/zones/${zone.id}`);
    }
  }, [isSuccess, isUninitialized, zone]);

  return (
    <Page twoColumn>
      <Head>
        <title>CSI-Stash :: Create Zone</title>
      </Head>
      <Card title="Create new controller">
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
          <FormSelect
            control={control}
            name="type"
            label="Type"
            rules={{
              required: 'Type is required',
            }}
          >
            <option value="">Select a type</option>
            {type === 'configuration' && <option value="base">Base</option>}
            {type === 'controller' && <option value="effects">Effects</option>}
            {type === 'controller' && <option value="instruments">Instruments</option>}
          </FormSelect>
          {type !== 'configuration' && (
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
          )}
          <button type="submit" disabled={isLoading}>
            <SaveIcon />
            Save
          </button>
        </form>
      </Card>
      <section>
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
