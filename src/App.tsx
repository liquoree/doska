import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "@/modules/auth";
import { ProjectsListPage, ProjectPage } from "@/modules/projects";
import { ProfilePage } from "@/modules/profile";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />

      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}