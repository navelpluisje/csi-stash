import { FileUpload } from '@components/atoms/fileUpload';
import React from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@assets/save.svg';
import { useAddZoneFileMutation } from '@store/zoneFile.admin.service';

interface Props {
  zoneId: string;
}

export const ZoneFileForm:React.FC<Props> = ({ zoneId }) => {
  const {
    handleSubmit, setValue, watch, register, reset,
  } = useForm();
  const [addZoneFile] = useAddZoneFileMutation();

  const onFileSubmit = (values: Record<string, string>) => {
    addZoneFile({
      body: {
        ...values,
        zoneId: parseInt(zoneId, 10),
      },
    });
    reset();
  };

  return (

    <form onSubmit={handleSubmit(onFileSubmit)}>
      <input type="hidden" {...register('file')} />
      <input type="hidden" {...register('filename')} />
      <FileUpload
        label="Zone-file"
        buttonText="Select Zone file"
        setValue={setValue}
        accept=".zon, .txt"
        watch={watch}
      />
      <button type="submit" disabled={false}>
        <SaveIcon />
        Save
      </button>
    </form>
  );
};
