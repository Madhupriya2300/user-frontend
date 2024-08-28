import "./App.css";
import PageLoader from "./common/pageLoader";
import ToastMessage from "./common/toastMessage";
import AppRoutes from "./routes/appRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastMessage />
        <PageLoader />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
