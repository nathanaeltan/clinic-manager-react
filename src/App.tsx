import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import Patients from "./pages/Patients";
import Medications from "./pages/Medications";
import AddMedication from "./pages/AddMedication";
import Root from "./pages/Root";
import store from "./store/store";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import MedicationDetails from "./pages/MedicationDetails";
import AddPatient from "./pages/AddPatient";
import Dashboard from "./pages/Dashboard";
const routes = [
  <Route path="/" element={<Root />}>
    <Route path="" element={<PrivateRoute />}>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/add" element={<AddPatient />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/medications/add" element={<AddMedication />} />
      <Route path="/medications/:id" element={<MedicationDetails />} />
    </Route>
  </Route>,
  <Route path="login" element={<Login />} />,
];


// Create browser router
const flatRoutes = createRoutesFromChildren(routes)
const router = createBrowserRouter(flatRoutes);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
