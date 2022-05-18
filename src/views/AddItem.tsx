import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Paper from 'components/common/Paper';
import Group from 'components/common/Group';
import GridContainer from 'components/common/GridContainer';
import GridItem from 'components/common/GridItem';
import TextInput from 'components/common/TextInput';
import Select from 'components/common/Select';
import UploadButton from 'components/common/UploadButton';
import Switch from 'components/common/Switch';
import Divider from 'components/common/Divider';
import Slider from 'components/common/Slider';
import ColorPicker from 'components/common/ColorPicker';
import Button from 'components/common/Button';
import useModels from 'hooks/uesModels';
import useItems from 'hooks/useItems';
import { ModelInfo } from 'models/models.interface';
import {
  ItemBasicInfo,
  ItemMaterialSetting,
  ItemOtherSetting,
  ItemDto,
} from 'models/items.interface';
import {
  defaultItemBasicInfo,
  defaultItemMaterialSetting,
  defaultItemOtherSetting,
  defaultItemFiles,
} from 'consts';

const typeList = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];

const AddItem = () => {
  const [basicInfo, setBasicInfo] =
    useState<ItemBasicInfo>(defaultItemBasicInfo);
  const [materialSetting, setMaterialSetting] = useState<ItemMaterialSetting>(
    defaultItemMaterialSetting,
  );
  const [otherSetting, setOtherSetting] = useState<ItemOtherSetting>(
    defaultItemOtherSetting,
  );
  const [files, setFiles] = useState(defaultItemFiles);
  const [color, setColor] = useState<string>('#00ff00');
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { getModels, modelList } = useModels();
  const { addItem } = useItems();

  const models = useMemo(() => {
    const modelValue = [{ label: 'Model', value: 'none' }];
    modelList.forEach((item: ModelInfo) => {
      modelValue.push({ label: item.name, value: item['_id'] });
    });
    return modelValue;
  }, [modelList]);

  const handleBasicInfoChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleMaterialSettingChange = (
    e: ChangeEvent<HTMLInputElement> & SelectChangeEvent<unknown>,
  ) => {
    console.log(e.target.checked);
    setMaterialSetting({
      ...materialSetting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSliderChange = (e: any) => {
    setMaterialSetting({
      ...materialSetting,
      [e.target!.name]: e.target.value,
    });
  };

  const handleOtherSettingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherSetting({ ...otherSetting, [e.target.name]: e.target.checked });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles({ ...files, [e.target.name]: e.target.files![0] });
  };

  const handleChangeColor = (value: any) => {
    setColor(value.hex);
  };

  const handleReset = () => {
    setBasicInfo(defaultItemBasicInfo);
    setMaterialSetting(defaultItemMaterialSetting);
    setOtherSetting(defaultItemOtherSetting);
    setFiles(defaultItemFiles);
    setColor('#00ff00');
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    const itemInfo: ItemDto = {
      name: basicInfo.name,
      description: basicInfo.description,
      model: basicInfo.model,
      previewImg: files.previewImage,
      'range-bump': materialSetting.bump,
      'color-emission': color,
      'range-intensity-emission': materialSetting.intensity,
      blendType: materialSetting.type,
      alphaTest: materialSetting.alphaTest,
      depthTest: otherSetting.depthTest,
      depthWrite: otherSetting.depthWrite,
      useFog: otherSetting.useFog,
      useLighting: otherSetting.useLight,
      useSkybox: otherSetting.useSkyBox,
      useGammaAndTonemap: otherSetting.useGamma,
      albedo: files.albedo,
      normal: files.normal,
      emission: files.emission,
      transparency: files.transparency,
    };
    try {
      await addItem(itemInfo);
      setIsSubmitLoading(false);
    } catch (e: any) {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <Paper tw="p-4">
      <Typography variant="h3" tw="font-black">
        Upload new Item
      </Typography>
      <Group groupName="Basic information">
        <GridContainer spacing={2}>
          <GridItem sm={12} md={6} lg={8}>
            <TextInput
              placeholder="Item name..."
              textColor="text-black"
              variant="outline"
              size="medium"
              name="name"
              onChange={handleBasicInfoChange}
              tw="mb-4"
            />
            <TextInput
              placeholder="Item description..."
              textColor="text-black"
              variant="outline"
              size="medium"
              name="description"
              multiline
              onChange={handleBasicInfoChange}
              tw="mb-4"
            />
            <Select
              itemList={models}
              inputName="model"
              value={basicInfo.model}
              onChange={handleBasicInfoChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <UploadButton
              label="Preview Image"
              inputChange={handleImageChange}
              fileType="media"
              accept="image/*"
              name="previewImage"
              file={files.previewImage}
            />
          </GridItem>
        </GridContainer>
      </Group>

      <Group groupName="Material settings">
        <Switch
          label="Use Transparency?"
          name="transparency"
          value={materialSetting.transparency}
          onChange={handleMaterialSettingChange}
        />

        <Divider dividerName="Normal map settings" />
        <Slider
          label="Bumpiness"
          name="bump"
          min={0}
          max={2}
          step={0.01}
          value={materialSetting.bump}
          onChange={handleSliderChange}
        />

        <Divider dividerName="Emission map settings" />
        <Slider
          label="Intensity"
          name="intensity"
          min={0}
          max={10}
          step={0.01}
          value={materialSetting.intensity}
          onChange={handleSliderChange}
        />

        <ColorPicker color={color} onChangeComplete={handleChangeColor} />
        <Divider dividerName="Transparency map settings" />
        <Select
          itemList={typeList}
          value={materialSetting.type}
          inputName="type"
          // @ts-ignore
          onChange={handleMaterialSettingChange}
          tw="my-2"
        />
        <Slider
          label="Alpha test"
          name="alphaTest"
          min={0}
          max={1}
          step={0.01}
          value={materialSetting.alphaTest}
          onChange={handleSliderChange}
        />
        <Switch
          label="Alpha to Coverage"
          name="alphaCoverage"
          value={materialSetting.alphaCoverage}
          onChange={handleMaterialSettingChange}
        />
      </Group>

      <Group groupName="Other settings">
        <GridContainer spacing={2}>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Depth Test"
              name="depthTest"
              value={otherSetting.depthTest}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Depth Write"
              name="depthWrite"
              value={otherSetting.depthWrite}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Use Fog?"
              name="useFog"
              value={otherSetting.useFog}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Use Lighting"
              name="useLight"
              value={otherSetting.useLight}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Use Skybox"
              name="useSkyBox"
              value={otherSetting.useSkyBox}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <Switch
              label="Use Gamma & Tonemap"
              name="useGamma"
              value={otherSetting.useGamma}
              onChange={handleOtherSettingChange}
            />
          </GridItem>
        </GridContainer>
      </Group>

      <Group groupName="Textures">
        <Stack direction="row" justifyContent="space-evenly">
          <UploadButton
            label="Albedo"
            inputChange={handleImageChange}
            fileType="media"
            accept="image/*"
            name="albedo"
            file={files.albedo}
          />
          <UploadButton
            label="Normal"
            inputChange={handleImageChange}
            fileType="media"
            accept="image/*"
            name="normal"
            file={files.normal}
          />
          <UploadButton
            label="Emission"
            inputChange={handleImageChange}
            fileType="media"
            accept="image/*"
            name="emission"
            file={files.emission}
          />
          <UploadButton
            label="Transparency"
            inputChange={handleImageChange}
            fileType="media"
            accept="image/*"
            name="transparency"
            file={files.transparency}
          />
        </Stack>
      </Group>
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

export default AddItem;
