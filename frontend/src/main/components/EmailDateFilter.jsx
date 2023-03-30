import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const toggleButtonStyling= {border:'solid', borderWidth:0, color:'grey', fontWeight:'bold', width:75, fontSize:12,'@media (max-width: 900px)':{fontSize:10, width:'auto'} };

function EmailDateFilterToggleButton({setFilter}) {
  const [emailDateFilter, setEmailDateFilter] = React.useState("today");

  const handleChange = (event, newEmailDateFilter) => {
    event.preventDefault();
    setEmailDateFilter(newEmailDateFilter);
    setFilter(newEmailDateFilter.toLowerCase());
  };

  return (
    <ToggleButtonGroup
      size="medium"
      color="primary"
      value={emailDateFilter}
      exclusive
      onChange={handleChange}
      sx={{my:1, }}
    >
      <ToggleButton value="today"  sx={toggleButtonStyling}>Today</ToggleButton>
      <ToggleButton value="3d" sx={toggleButtonStyling}>3D</ToggleButton>
      <ToggleButton value="1w" sx={toggleButtonStyling}>1W</ToggleButton>
      <ToggleButton value="1m" sx={toggleButtonStyling}>1M</ToggleButton>
      <ToggleButton value="all" sx={toggleButtonStyling}>All</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default EmailDateFilterToggleButton;