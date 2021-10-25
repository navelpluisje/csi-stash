import { FileUpload } from '@components/atoms/fileUpload';
import React from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@assets/save.svg';

interface Props {
  zoneId: string;
}

export const ZoneFileForm:React.FC<Props> = ({ zoneId }) => {
  const {
    handleSubmit, setValue, watch, register, reset,
  } = useForm();

  const onFileSubmit = (values: unknown) => {
    console.log(values, zoneId);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFileSubmit)}>
      <input type="hidden" {...register('file')} />
      <input type="hidden" {...register('filename')} />
      <FileUpload
        label="Zone-file"
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
