import axios from "axios";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";


import "./App.css";
import AppRouter from "./AppRouter";
import Home from "./pages/Home";
import AuthContextProvider from "./context/AuthContext";

// axios.defaults.baseURL = "https://dev-apigw-marketing.fast-pay.cash";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.headers.common["Authorization"] = "mytoken";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
    color: "#ddd",
    h4: {
      fontSize: "1.8rem",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
