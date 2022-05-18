/*
  eslint @typescript-eslint/no-unused-vars: 0,
  operator-linebreak: 0,
  implicit-arrow-linebreak: 0,
  indent: 0
*/
import { createContext, useState, FC, useMemo } from 'react';
import axios from 'services/axios';
import { ItemListType } from 'components/common/Select';
import { ModelInfo, IModelDto } from 'models/models.interface';

interface IContext {
  isLoading: boolean;
  modelList: ModelInfo[];
  characters: ItemListType[];
  modelTypes: ItemListType[];
  getModels(): void;
  getCharacters(): void;
  getModelTypes(): void;
  addModel(modelInfo: IModelDto): void;
}

const defaultState = {
  isLoading: false,
  modelList: [],
  characters: [],
  modelTypes: [],
  getModels: () => {},
  getCharacters: () => {},
  getModelTypes: () => {},
  addModel: (modelInfo: IModelDto) => {},
};

export const ModelContext = createContext<IContext>(defaultState);

const ModelProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelList, setModelList] = useState<ModelInfo[]>([]);
  const [characters, setCharacters] = useState<ItemListType[]>([]);
  const [modelTypes, setModelTypes] = useState<ItemListType[]>([]);

  async function getModels() {
    setIsLoading(true);
    try {
      const res = await axios.get('private/gets/getMyModels');
      setModelList(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  async function getCharacters() {
    setIsLoading(true);
    try {
      const res = await axios.get('private/gets/getCharacters');
      const list = res.data.map((item: string) => ({
        label: item,
        value: item,
      }));
      setCharacters(list);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  async function getModelTypes() {
    try {
      setIsLoading(true);
      const res = await axios.get('private/gets/getModelTypes');
      const list = res.data.map((item: string) => ({
        label: item,
        value: item,
      }));
      setModelTypes(list);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  async function addModel(modelInfo: IModelDto) {
    const getKeyValue =
      <T extends object, U extends keyof T>(obj: T) =>
      (key: U) =>
        obj[key];
    const modelFormData = Object.keys(modelInfo).reduce((formData, key) => {
      formData.append(
        key,
        getKeyValue<IModelDto, keyof IModelDto>(modelInfo)(key as any),
      );
      return formData;
    }, new FormData());
    await axios.post('private/posts/uploadModel', modelFormData);
  }

  const value = useMemo(
    () => ({
      isLoading,
      modelList,
      characters,
      modelTypes,
      getModels,
      getCharacters,
      getModelTypes,
      addModel,
    }),
    [isLoading, characters, modelTypes],
  );

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
};

export default ModelProvider;
