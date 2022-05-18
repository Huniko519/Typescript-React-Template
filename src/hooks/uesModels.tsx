import { useContext } from 'react';
import { ModelContext } from 'contexts/ModelContext';

const useModels = () => useContext(ModelContext);

export default useModels;
