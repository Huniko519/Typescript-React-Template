import { useEffect } from 'react';
import { format } from 'date-fns';
import useModels from 'hooks/uesModels';
import Card from 'components/common/Card';
import GridContainer from 'components/common/GridContainer';
import GridItem from 'components/common/GridItem';
import Loading from 'components/common/Loading';
import { ModelInfo } from 'models/models.interface';

const Models = () => {
  const { isLoading, modelList, getModels } = useModels();

  useEffect(() => {
    getModels();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <GridContainer spacing={2}>
      {modelList.map((item: ModelInfo) => (
        <GridItem xs={2} sm={4} md={4} key={item['_id']}>
          <Card
            media={item.path}
            mediaType="3d"
            title={item.name}
            description={`<strong>Model Type: </strong>${item.type}<br /><strong>Model character:</strong> ${item.character}`}
            userId={item.user}
            date={format(item.createdTime, 'MMM dd, yyyy')}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Models;
