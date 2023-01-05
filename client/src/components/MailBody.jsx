import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IconButton, Toolbar } from '@mui/material';

export default function AlignItemsList() {
  return (

    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem >
        <Toolbar position="static">
            <Checkbox edge="start" checked={true}/>
            <IconButton>
                <DeleteForeverIcon />
            </IconButton>
            <IconButton>
                <StarIcon/>
            </IconButton>
            <IconButton>
                <ReportGmailerrorredIcon />
            </IconButton> 
            <IconButton>
                <DriveFileMoveIcon />
            </IconButton>
        </Toolbar>
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <Checkbox edge="start" />
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                noWrap
              >
               
              </Typography>
              {" — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…I'll be in your neighborhood doing errands this…I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider  component="li" />
      <ListItem alignItems="flex-start">
        <Checkbox edge="start" />
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                noWrap
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <Checkbox edge="start" />
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                noWrap
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      
    </List>
  );
}
