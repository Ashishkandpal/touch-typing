import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

// const PinkSwitch = styled(Switch)(({ theme }) => ({
//   "& .MuiSwitch-switchBase.Mui-checked": {
//     color: pink[600],
//     "&:hover": {
//       backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//     },
//   },
//   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//     backgroundColor: pink[600],
//   },
// }));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function MusicToggler() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem("sound", checked);
  };
  localStorage.setItem("sound", checked);
  return (
    <div>
      <Tooltip title={`Sound ${checked ? "on" : "off"}`}>
        <Switch
          {...label}
          defaultChecked
          color="warning"
          onChange={handleChange}
        />
      </Tooltip>
    </div>
  );
}
