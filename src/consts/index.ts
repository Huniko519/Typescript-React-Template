import { ItemListType } from 'components/common/Select';
import { IModelDto } from 'models/models.interface';
import {
  ItemBasicInfo,
  ItemMaterialSetting,
  ItemOtherSetting,
} from 'models/items.interface';

export const modelCharacter: ItemListType[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export const modelPart: ItemListType[] = [
  { label: 'Head', value: 'head' },
  { label: 'Eyes', value: 'eyes' },
  { label: 'Hair', value: 'head' },
  { label: 'Shirt', value: 'shirt' },
  { label: 'Dress', value: 'dress' },
  { label: 'Leggins', value: 'leggins' },
  { label: 'Boots', value: 'boots' },
  { label: 'Accesories', value: 'Accesories' },
];

export const defaultModelInfo: IModelDto = {
  name: '',
  character: '',
  type: '',
  model: null,
};

// item constants
export const defaultItemBasicInfo: ItemBasicInfo = {
  name: '',
  description: '',
  model: 'none',
};

export const defaultItemMaterialSetting: ItemMaterialSetting = {
  transparency: false,
  bump: 1,
  intensity: 5,
  color: '#0000ff',
  type: 1,
  alphaTest: 0.5,
  alphaCoverage: false,
};

export const defaultItemOtherSetting: ItemOtherSetting = {
  depthTest: false,
  depthWrite: false,
  useFog: false,
  useLight: false,
  useSkyBox: false,
  useGamma: false,
};

export const defaultItemFiles = {
  previewImage: null,
  albedo: null,
  normal: null,
  emission: null,
  transparency: null,
};
