import { readFileContent } from '@utils/readFileContent';
import React from 'react';
import {
  Control, FieldValues, RegisterOptions, useController, UseFormSetValue,
} from 'react-hook-form';

interface Props {
  fileName?: string;
  filenameName?: string;
  label: string;
  setValue: UseFormSetValue<FieldValues>;
  control: Control;
  rules?: RegisterOptions;
  accept?: string;
}

export const FileUpload: React.FC<Props> = ({
  control, label, fileName = 'file', filenameName = 'filename', rules, setValue, accept = '',
}) => {
  const {
    field: file,
    fieldState: { error: fileError },
  } = useController({
    name: fileName, control, rules, defaultValue: '',
  });
  const {
    field: filename,
    fieldState: { error: filenameError },
  } = useController({
    name: filenameName, control, rules, defaultValue: '',
  });

  const handleUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const uploadFile = target.files ? target.files[0] : null;
    if (uploadFile) {
      const fileContent = await readFileContent(uploadFile);
      setValue(fileName, fileContent);
      setValue(filenameName, uploadFile.name);
    }
  };

  return (
    <div className="form-field-group">
      <label htmlFor="file">{label}</label>
      <label className="button button-outline upload-button" htmlFor="upload">
        {/* @ts-ignore */}
        <input
          id="upload"
          type="file"
          name="upload"
          // @ts-ignore
          onChange={handleUpload}
          accept={accept}
        />
        Select MST-file
      </label>
      {filename.value}
      <pre><code>{file.value}</code></pre>
      {
        (fileError || filenameError)
        && <div className="error-message">{fileError?.message || filenameError?.message}</div>
      }
    </div>
  );
};
