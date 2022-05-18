export interface ItemInfo {
  approved: boolean;
  approvedDate: number;
  creationDate: number;
  description: string;
  minted: boolean;
  mintedDate: number;
  name: string;
  user: string;
  _id: string;
  gameData: any;
}

export interface GameData {
  preview: string;
}

export interface ItemDto {
  name: string;
  description: string;
  model: string;
  previewImg: any;
  ['range-bump']: number;
  ['color-emission']: string;
  ['range-intensity-emission']: number;
  blendType: number;
  alphaTest: number;
  depthTest: boolean;
  depthWrite: boolean;
  useFog: boolean;
  useLighting: boolean;
  useSkybox: boolean;
  useGammaAndTonemap: boolean;
  albedo: any;
  normal: any;
  emission: any;
  transparency: any;
}

export interface ItemBasicInfo {
  name: string;
  description: string;
  model: string;
}

export interface ItemMaterialSetting {
  transparency: boolean;
  bump: number;
  intensity: number;
  color: string;
  type: number;
  alphaTest: number;
  alphaCoverage: boolean;
}

export interface ItemOtherSetting {
  depthTest: boolean;
  depthWrite: boolean;
  useFog: boolean;
  useLight: boolean;
  useSkyBox: boolean;
  useGamma: boolean;
}
