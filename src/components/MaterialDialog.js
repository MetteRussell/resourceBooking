import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';


function MaterialDialog({ onClose, selectedValue, open, options } ) {
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Vælg Materiale</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem disableGutters key={option.id}>
            <ListItemButton onClick={() => handleListItemClick(option)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
        
      </List>
    </Dialog>
  );
};

export default MaterialDialog;


