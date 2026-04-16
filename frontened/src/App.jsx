import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />

       <Route
        path="/chat"
        element={
       <ProtectedRoute>
       <Chat setIsAuthenticated={setIsAuthenticated} />
       </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;