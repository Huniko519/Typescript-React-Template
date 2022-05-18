import React, { FC } from 'react';
import {
  Box,
  Card as MuiCard,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
interface ICardProps {
  media: string;
  mediaType: 'image' | 'video' | '3d';
  title: string;
  description: string;
  userId: string;
  date: string;
}

const Card: FC<ICardProps> = (props) => {
  const { media, title, description, userId, date, mediaType } = props;

  return (
    <MuiCard tw="border border-gray-200 rounded-2xl shadow-[0 6px 10px -4px rgb(0 0 0 / 15%)]">
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={userId}
        subheader={date}
      />
      {mediaType !== '3d' ? (
        <CardMedia
          component="img"
          image={media}
          alt="green iguana"
          tw="h-[180px]"
        />
      ) : (
        <Box tw="w-full">
          <model-viewer
            alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
            src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
            ar
            ar-modes="webxr scene-viewer quick-look"
            seamless-poster
            shadow-intensity="1"
            camera-controls
          />
        </Box>
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userId}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

Card.defaultProps = {
  //   color: '',
};

export default Card;
