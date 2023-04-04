import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// get the file icon based on the file type
function getFileIcon(fileType) {
  if (fileType.includes('image/')) {
    return <ImageIcon />;
  } if (fileType.includes('application/pdf')) {
    return <PictureAsPdfIcon />;
  } if (fileType.includes('audio/')) {
    return <AudiotrackIcon />;
  } if (fileType.includes('text/') || fileType.includes('application/')) {
    return <DescriptionIcon />;
  }
  return <DescriptionIcon />;
}

export default getFileIcon;
