import { FileUpload } from '@components/atoms/fileUpload';
import React from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@assets/save.svg';
import { useAddZoneFileMutation, useLazyGetFilesByZoneIdQuery, ZoneFile } from '@store/zoneFile.admin.service';

interface Props {
  zoneId: string;
}

export const ZoneFileForm:React.FC<Props> = ({ zoneId }) => {
  const {
    handleSubmit, setValue, watch, register, reset,
  } = useForm();
  const [addZoneFile] = useAddZoneFileMutation();
  const [getZoneFiles] = useLazyGetFilesByZoneIdQuery();

  const onFileSubmit = async (values: Record<string, string>) => {
    const result = await addZoneFile({
      body: {
        ...values,
        zoneId: parseInt(zoneId, 10),
      },
    });
    if ((result as { data: ZoneFile; }).data) {
      await getZoneFiles((result as { data: ZoneFile; }).data.zoneId.toString());
    }
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
