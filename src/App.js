import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { MainRoutes } from "./pages/MainRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<MainRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
                                 