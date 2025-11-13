import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import { RegisterPage } from "./pages/AuthenticatePage/RegisterPage";
import { PrivateRouterLoginAndRegister } from "./components/PrivateRoute/RedirectLogin";
import { LoginPage } from "./pages/AuthenticatePage/LoginPage";
import ProtectedRoute from "./components/PrivateRoute/AccessRouteConnected";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { LogoutPage } from "./pages/AuthenticatePage/LogoutPage";
import { DicoPublicPage } from "./pages/Dico/DicoPublicPage";
import { MyDicoPage } from "./pages/Dico/MyDicoPage";
import { ModalProvider } from "./hooks/useModal";
import { MenuLearnCategoriesProvider } from "./hooks/useMenuLearnCategories";
import { LearnCategoriesPage } from "./pages/Learn/LearnCategoriesPage";
import { LearnByCategoryPage } from "./pages/Learn/LearnByCategoryPage";
import { LearnAllLessonsPage } from "./pages/Learn/LearnAllLessonsPage";
import { AddWordPage } from "./pages/Dico/AddWordPage";
import { AddSingleWordPage } from "./pages/Dico/AddSingleWordPage";
import { ImportWordPage } from "./pages/Dico/ImportWordPage";
import { SettingsUserProvider } from "./hooks/useSettingsUser";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <SettingsUserProvider>
            <MenuLearnCategoriesProvider>
              <ModalProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                      path="login"
                      element={
                        <PrivateRouterLoginAndRegister>
                          <LoginPage />
                        </PrivateRouterLoginAndRegister>
                      }
                    />
                    <Route
                      path="register"
                      element={
                        <PrivateRouterLoginAndRegister>
                          <RegisterPage />
                        </PrivateRouterLoginAndRegister>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="logout"
                      element={
                        <ProtectedRoute>
                          <LogoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="dico/public" element={<DicoPublicPage />} />
                    <Route
                      path="dico/my-dico"
                      element={
                        <ProtectedRoute>
                          <MyDicoPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dico/add-choice"
                      element={
                        <ProtectedRoute>
                          <AddWordPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dico/add-choice/single"
                      element={
                        <ProtectedRoute>
                          <AddSingleWordPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dico/add-choice/import"
                      element={
                        <ProtectedRoute>
                          <ImportWordPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="learn-arabic"
                      element={<LearnCategoriesPage />}
                    />
                    <Route
                      path="learn-arabic/:slug"
                      element={<LearnByCategoryPage />}
                    />
                    <Route
                      path="learn-arabic/lessons"
                      element={<LearnAllLessonsPage />}
                    />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ModalProvider>
            </MenuLearnCategoriesProvider>
          </SettingsUserProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
