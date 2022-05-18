import React, { useEffect } from 'react';
import { format } from 'date-fns';
import GridContainer from 'components/common/GridContainer';
import GridItem from 'components/common/GridItem';
import Card from 'components/common/Card';
import Loading from 'components/common/Loading';
import useItems from 'hooks/useItems';
import { ItemInfo } from 'models/items.interface';

const Item = () => {
  const { isLoading, itemList, getItems } = useItems();

  useEffect(() => {
    getItems();
  }, []);

  return !isLoading ? (
    <GridContainer spacing={2}>
      {itemList.map((item: ItemInfo) => (
        <GridItem xs={2} sm={4} md={4} key={item['_id']}>
          <Card
            media={item.gameData?.textures?.previewImg?.location}
            mediaType="image"
            title={item.name}
            description={item.description}
            userId={item.user}
            date={format(item.creationDate, 'MMM dd, yyyy')}
          />
        </GridItem>
      ))}
    </GridContainer>
  ) : (
    <Loading />
  );
};

export default Item;
