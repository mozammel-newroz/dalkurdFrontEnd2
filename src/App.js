import axios from "axios";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import "./App.css";
import AppRouter from "./AppRouter";
import AuthContextProvider from "./context/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Fira Sans Condensed", "sans-serif"].join(","),
    color: "#ddd",
    h4: {
      fontSize: "1.8rem",
      fontWeight: 400,
      margin: "0 0 20px 0",
    },
  },
  palette: {
    primary: {
      // main: "#40739e",
      main: "#5f27cd",
    },
    secondary: {
      main: "#ff6b6b",
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
