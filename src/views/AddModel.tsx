import React, { ChangeEvent, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material/Select';
import { Store } from 'react-notifications-component';
import Paper from 'components/common/Paper';
import TextInput from 'components/common/TextInput';
import Select from 'components/common/Select';
import UploadButton from 'components/common/UploadButton';
import Button from 'components/common/Button';
import useModels from 'hooks/uesModels';
import { IModelDto } from 'models/models.interface';
import { defaultModelInfo } from 'consts';

const AddModel = () => {
  const [modelInfo, setModelInfo] = useState<IModelDto>(defaultModelInfo);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { modelTypes, characters, getModelTypes, getCharacters, addModel } =
    useModels();

  const handleModelInfoChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    setModelInfo({ ...modelInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModelInfo({ ...modelInfo, model: e.target.files![0] });
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    try {
      await addModel(modelInfo);
      Store.addNotification({
        title: 'Success',
        message: 'Successfully Upload Model',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } catch (e: any) {
      Store.addNotification({
        title: 'Error!',
        message: e.response.data,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
    setIsSubmitLoading(false);
  };

  const handleReset = () => {
    setModelInfo(defaultModelInfo);
  };

  useEffect(() => {
    getModelTypes();
    getCharacters();
  }, []);

  return (
    <Paper tw="p-4">
      <Typography variant="h3" tw="mb-3 font-black">
        Upload new Model
      </Typography>
      <TextInput
        placeholder="Model name..."
        textColor="black"
        variant="outline"
        name="name"
        value={modelInfo.name}
        onChange={handleModelInfoChange}
        tw="mb-3"
      />
      <Select
        itemList={characters}
        inputName="character"
        onChange={handleModelInfoChange}
        tw="mb-3"
      />
      <Select
        itemList={modelTypes}
        inputName="type"
        onChange={handleModelInfoChange}
        tw="mb-3"
      />
      <UploadButton
        label="FBX"
        inputChange={handleFileChange}
        fileType="other"
        file={modelInfo.model}
        accept=".fbx"
        name="model"
      />
      <Stack direction="row" justifyContent="space-between" tw="mt-5">
        <Button
          label="Reset"
          variant="contained"
          color="warning"
          disabled={isSubmitLoading}
          onClick={handleReset}
        />
        <Button
          label="Upload"
          variant="contained"
          color="primary"
          loading={isSubmitLoading}
          disabled={isSubmitLoading}
          onClick={handleSubmit}
        />
      </Stack>
    </Paper>
  );
};

export default AddModel;
