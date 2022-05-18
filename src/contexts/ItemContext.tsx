/*
  eslint @typescript-eslint/no-unused-vars: 0,
  operator-linebreak: 0,
  implicit-arrow-linebreak: 0,
  indent: 0
*/
import { createContext, useState, FC, useMemo } from 'react';
import axios from 'services/axios';
import { ItemInfo, ItemDto } from 'models/items.interface';

interface IContext {
  isLoading: boolean;
  itemList: ItemInfo[];
  getItems(): void;
  addItem(itemInfo: ItemDto): void;
}

const defaultState = {
  isLoading: false,
  itemList: [],
  getItems: () => {},
  addItem: (itemInfo: ItemDto) => {},
};

export const ItemContext = createContext<IContext>(defaultState);

const ItemProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ItemInfo[]>([]);

  async function getItems() {
    setIsLoading(true);
    try {
      const res = await axios.get('private/gets/getMyItems');
      setItemList(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  async function addItem(itemInfo: ItemDto) {
    // console.log(itemInfo);
    const getKeyValue =
      <T extends object, U extends keyof T>(obj: T) =>
      (key: U) =>
        obj[key];
    const itemFormData = Object.keys(itemInfo).reduce((formData, key) => {
      formData.append(
        key,
        getKeyValue<ItemDto, keyof ItemDto>(itemInfo)(key as any),
      );
      return formData;
    }, new FormData());
    await axios.post('private/posts/uploadItem', itemFormData);
  }

  const value = useMemo(
    () => ({ isLoading, itemList, getItems, addItem }),
    [isLoading],
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemProvider;
