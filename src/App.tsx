// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./features/auth";
import Dashboard from "./features/dashboard";
import Profile from "./features/profile";
import Settings from "./features/setting";
import Home from "./features/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthScreen />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
