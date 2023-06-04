import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

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
