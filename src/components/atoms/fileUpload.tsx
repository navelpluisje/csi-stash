import { readFileContent } from '@utils/readFileContent';
import React, { ChangeEvent, useState } from 'react';
import {
  FieldValues, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import AddFileIcon from '@assets/add-file.svg';
import { AnimatePresence, motion } from 'framer-motion';
import CodeIcon from '@assets/code.svg';

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
  const [showCode, setShowCode] = useState(true);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const uploadFile = target.files ? target.files[0] : null;
    if (uploadFile) {
      const fileContent = await readFileContent(uploadFile);
      setValue(fileName, fileContent);
      setValue(filenameName, uploadFile.name);
    }
  };

  const handleToggleCode = () => {
    setShowCode(!showCode);
  };

  return (
    <div className="form-field-group file-upload">
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
      {file && (
      <button onClick={handleToggleCode} type="button" className="button-outline">
        <CodeIcon />
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      )}
      {file && (
      <section className="code-block">
        <div>{filename}</div>
        <AnimatePresence>
          {showCode && <motion.pre exit={{ height: 0 }} animate={{ height: 'auto' }} initial={{ height: 0 }}><code>{file}</code></motion.pre>}
        </AnimatePresence>
      </section>
      )}
      {/* {
        (fileError || filenameError)
        && <div className="error-message">{fileError?.message || filenameError?.message}</div>
      } */}
    </div>
  );
};
