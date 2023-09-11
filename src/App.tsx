import { Navigate, Outlet } from "react-router-dom";
import "./App.less";

function App() {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default App;
