export interface ModelInfo {
  approved: boolean;
  approvedDate: number;
  character: string;
  createdTime: number;
  key: string;
  name: string;
  path: string;
  type: string;
  user: string;
  _id: string;
}

export interface IModelDto {
  name: string;
  character: string;
  type: string;
  model: any;
}
