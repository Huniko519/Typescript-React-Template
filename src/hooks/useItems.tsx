import { useContext } from 'react';
import { ItemContext } from 'contexts/ItemContext';

const useItems = () => useContext(ItemContext);

export default useItems;
