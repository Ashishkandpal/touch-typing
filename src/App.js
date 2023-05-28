import { GlobalStyles } from "./Styles/global";

import { ThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <div className="canvas">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
