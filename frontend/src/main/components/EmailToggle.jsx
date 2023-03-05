import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function EmailDateFilterToggleButton() {
  const [emailDateFilter, setEmailDateFilter] = React.useState("today");

  const handleChange = (event, newEmailDateFilter) => {
    setEmailDateFilter(newEmailDateFilter);
  };

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={emailDateFilter}
      exclusive
      onChange={handleChange}
      sx={{ color: "black" }}
    >
      <ToggleButton value="today">Today</ToggleButton>
      <ToggleButton value="3d">3D</ToggleButton>
      <ToggleButton value="1w">1W</ToggleButton>
      <ToggleButton value="1m">1M</ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  );
}
