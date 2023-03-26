import * as React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorActionAlert({openAlert, message, closeAlert}) {
    const [open, setOpen] = React.useState(openAlert);
    React.useEffect(() => {setOpen(openAlert)},[openAlert]);
  return (
    <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                closeAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ position:'absolute', mb: 2, top:0, left:'50%',transform:'translateX(-50%)' ,zIndex:1000 }}
        >
          {message}
        </Alert>
      </Collapse>
  );
}
