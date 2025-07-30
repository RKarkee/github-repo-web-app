import { RouterProvider } from "react-router-dom";
import "./App.css";
import { rootRouter } from "./routes";
const App: React.FC = () => {
  return <RouterProvider router={rootRouter} />;
};

export default App;
