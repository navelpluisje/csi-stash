/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { readFileContent } from '@utils/readFileContent';
import { useForm } from 'react-hook-form';
import { Modal } from '@components/atoms/modal';

export const AddZoneForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    register, handleSubmit, setValue, watch, reset,
  } = useForm();
  const filename = watch('filename');
  const file = watch('file');

  useEffect(() => {
    // When data is set and we have retrieved an id, re-fetch the files/configuration again
  }, []);

  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
    reset();
    // addController({ body: values });
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const uploadFile = target.files ? target.files[0] : null;
    if (uploadFile) {
      const fileContent = await readFileContent(uploadFile);
      setValue('file', fileContent);
      setValue('filename', uploadFile.name);
    }
  };

  return (
    <section className="add-file-form">
      <hr />
      <Modal
        title="Add Zone file"
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register('name')} />
          </div>
          <div>
            <label htmlFor="description">Decsription</label>
            <textarea {...register('description')} />
          </div>
          <div>
            <input type="hidden" {...register('author')} defaultValue="1" />
            <label htmlFor="file">Zon file</label>
            <label className="button button-outline upload-button">
              <input id="upload" type="file" onChange={(event) => handleUpload(event)} />
              Select ZON-file
            </label>
            {filename}
            <pre><code>{file }</code></pre>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <button type="button" onClick={() => setShowForm(true)}>Add Zone</button>
    </section>
  );
};
