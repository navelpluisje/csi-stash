import { readFileContent } from '@utils/readFileContent';
import React, { ChangeEvent } from 'react';
import {
  FieldValues, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import AddFileIcon from '@assets/add-file.svg';

interface Props {
  fileName?: string;
  filenameName?: string;
  label: string;
  buttonText: string;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  accept?: string;
}

export const FileUpload: React.FC<Props> = ({
  watch, label, buttonText, fileName = 'file', filenameName = 'filename', setValue, accept = '',
}) => {
  const file = watch(fileName);
  const filename = watch(filenameName);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
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
        <input
          id="upload"
          type="file"
          name="upload"
          onChange={(event) => handleUpload(event)}
          accept={accept}
        />
        <AddFileIcon />
        {buttonText}
      </label>
      {filename}
      <pre><code>{file}</code></pre>
      {/* {
        (fileError || filenameError)
        && <div className="error-message">{fileError?.message || filenameError?.message}</div>
      } */}
    </div>
  );
};
