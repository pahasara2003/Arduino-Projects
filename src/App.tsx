import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ChatPanel from "./pages/chatPanel";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/esp" />
      <Route element={<ChatPanel />} path="/" />
    </Routes>
  );
}

export default App;
