import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ChatPanel from "./pages/chatPanel";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ChatPanel />} path="/chat" />
    </Routes>
  );
}

export default App;
