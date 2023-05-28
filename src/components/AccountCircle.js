import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import GoogleButton from "react-google-button";
import { Box } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useTheme } from "../context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(0);

  const { theme } = useTheme();

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleModalOpen = () => {
    if (user) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const logoutHandler = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("successfully logged out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Not able to log out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("google login successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleModalClose();
      })
      .catch((err) => {
        toast.error(
          errorMapping[err.code] || "not able to use google authentication",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  };

  return (
    <>
      <div className="account">
        <AccountCircleIcon onClick={handleModalOpen} />
        {user && <LogoutIcon onClick={logoutHandler} />}
        <Modal
          open={open}
          onClose={handleModalClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur",
          }}
        >
          <div
            style={{
              width: "400px",
              background: "black",
              textAlign: "center",
              height: "450px",
            }}
          >
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleValueChange}
                variant="fullWidth"
              >
                <Tab label="login" style={{ color: theme.textColor }}></Tab>
                <Tab label="signup" style={{ color: theme.textColor }}></Tab>
              </Tabs>
            </AppBar>
            {value === 0 && <LoginForm handleClose={handleModalClose} />}
            {value === 1 && <SignUpForm handleClose={handleModalClose} />}
            <Box>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: "85%",
                  marginTop: "20px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                onClick={handleGoogleSignIn}
              />
            </Box>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AccountCircle;
