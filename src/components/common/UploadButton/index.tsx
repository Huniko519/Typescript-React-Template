import React, { ChangeEvent, useMemo } from 'react';
import { Box } from '@mui/material';
import { AddBox, UploadFile } from '@mui/icons-material';

interface IUploadButtonProps {
  label: string;
  fileType: 'media' | 'other';
  accept: string;
  name: string;
  file?: any;
  inputChange(e: ChangeEvent<HTMLInputElement>): void;
}

const UploadButton = (props: IUploadButtonProps) => {
  const { label, fileType, accept, name, file, inputChange } = props;
  const previewImage = useMemo(() => {
    let fileLink: string = '';
    if (fileType === 'media' && file) {
      fileLink = URL.createObjectURL(file);
    } else {
      fileLink = '';
    }
    return fileLink;
  }, [file]);

  return (
    <div tw="h-full">
      <div tw="mt-[-10px] ml-[15px]">
        <span tw="bg-white">{label}</span>
      </div>
      <label htmlFor={`contained-button-file-${name}`}>
        <input
          accept={accept}
          id={`contained-button-file-${name}`}
          type="file"
          hidden
          name={name}
          onChange={inputChange}
        />
        {fileType === 'media' ? (
          <Box tw="flex w-full h-full items-center justify-center rounded-lg border-4 border-dashed border-gray-400 cursor-pointer mt-[-15px]">
            {previewImage === '' ? (
              <AddBox tw="text-7xl" />
            ) : (
              <img src={previewImage} alt="preview" tw="w-full" />
            )}
          </Box>
        ) : (
          <Box tw="flex w-full items-center justify-center rounded-lg border-4 border-dashed border-gray-400 cursor-pointer mt-[-15px] p-2">
            {file ? (
              <p>
                <UploadFile />
                {file.name}
              </p>
            ) : (
              <p>Browser File...</p>
            )}
          </Box>
        )}
      </label>
    </div>
  );
};

UploadButton.defaultProps = {
  file: null,
};

export default UploadButton;
