/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Card } from '@components/atoms/card';
import { Link } from '@components/atoms/link';
import { useGetControllerByIdQuery, useUpdateControllerMutation } from '@store/controller.admin.service';
import { FormInput } from '@components/atoms/formInput';
import { FileUpload } from '@components/atoms/fileUpload';
import SaveIcon from '@assets/save.svg';
import { ControllerZones } from '@components/organisms/controllerZones';
import { ControllerConfigurations } from '@components/organisms/controllerConfigurations';

const Admin = () => {
  const { query, push } = useRouter();
  const { data = [], isLoading } = useGetControllerByIdQuery(parseInt(query.id as string, 10));
  const [updateController, {
    isLoading: isUpdating, isUninitialized, isSuccess,
  }] = useUpdateControllerMutation();
  const {
    register, handleSubmit, setValue, control, watch,
  } = useForm();

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
              <input {...register('file')} type="hidden" />
              <input {...register('filename')} type="hidden" />
              <FormInput
                control={control}
                name="brand"
                label="Brand"
                rules={{ required: 'Brand is required' }}
              />
              <FormInput
                control={control}
                name="model"
                label="Model"
                rules={{ required: 'Model is required' }}
              />
              <FileUpload
                label="MST-file"
                watch={watch}
                setValue={setValue}
                accept=".mst, .txt"
              />
              <button type="submit" disabled={isUpdating}>
                <SaveIcon />
                Save
              </button>
            </form>
          )}
        </Card>
        <ControllerConfigurations controllerId={query.id as string} />
      </section>
      <section>
        <ControllerZones controllerId={query.id as string} />
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
