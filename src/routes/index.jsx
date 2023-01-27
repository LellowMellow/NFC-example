import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Sender from "../pages/Sender";
import Receiver from "../pages/Receiver";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sender />} />
      <Route path="/r" element={<Receiver />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
