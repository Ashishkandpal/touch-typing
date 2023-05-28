import React from "react";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";

import { themeOptions } from "../Utils/themeOptions";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };
  return (
    <div className="footer">
      <div className="links">
        <div className="github">
          <GitHubIcon />
        </div>
      </div>
      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme.value }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.background
                  : theme.textColor,
                color: !isFocused ? theme.textColor : theme.background,
                cursor: "pointer",
              };
            },
            singleValue: (styles) => ({
              ...styles,
              color: theme.textColor,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Footer;
