import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import PrivateRouterLoginAndRegister from "./components/PrivateRoute/RedirectLogin";
import ProtectedRoute from "./components/PrivateRoute/AccessRouteConnected";

import { ModalProvider } from "./hooks/useModal";
import { MenuLearnCategoriesProvider } from "./hooks/useMenuLearnCategories";
import { SettingsUserProvider } from "./hooks/useSettingsUser";
import { WordsThemesProvider } from "./hooks/useWordsThemes";
import { FoldersProvider } from "./hooks/useFolders";
import { DicoContextProvider } from "./hooks/useDico";

/* 🔥 Lazy pages */
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/AuthenticatePage/LoginPage"));
const RegisterPage = lazy(
  () => import("./pages/AuthenticatePage/RegisterPage"),
);
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const LogoutPage = lazy(() => import("./pages/AuthenticatePage/LogoutPage"));
const DicoPublicPage = lazy(
  () => import("./pages/DicoPage/Dico/DicoPublicPage"),
);
const MyDicoPage = lazy(() => import("./pages/DicoPage/Dico/MyDicoPage"));
const AddWordPage = lazy(() => import("./pages/DicoPage/Dico/AddWordPage"));
const AddSingleWordPage = lazy(
  () => import("./pages/DicoPage/Dico/AddSingleWordPage"),
);
const ImportWordPage = lazy(
  () => import("./pages/DicoPage/Dico/ImportWordPage"),
);
const DicoThemesPage = lazy(
  () => import("./pages/DicoPage/Themes/DicoThemesPage"),
);
const LearnCategoriesPage = lazy(
  () => import("./pages/Learn/LearnCategoriesPage"),
);
const LearnByCategoryPage = lazy(
  () => import("./pages/Learn/LearnByCategoryPage"),
);
const LearnAllLessonsPage = lazy(
  () => import("./pages/Learn/LearnAllLessonsPage"),
);
const FolderPage = lazy(() => import("./pages/FolderPage/FolderPage"));
const FolderBySlugPage = lazy(
  () => import("./pages/FolderPage/FolderBySlugPage"),
);
const TextFolderEditPage = lazy(
  () => import("./pages/FolderPage/TextFolderEditPage"),
);
const FlashcardsPage = lazy(
  () => import("./pages/FlashcardPage/FlashcardsPage"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <DicoContextProvider>
            <WordsThemesProvider>
              <FoldersProvider>
                <SettingsUserProvider>
                  <MenuLearnCategoriesProvider>
                    <ModalProvider>
                      {/* 🔥 Suspense ici */}
                      <Suspense fallback={<div>Loading...</div>}>
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

                            <Route
                              path="dico/public"
                              element={<DicoPublicPage />}
                            />

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
                              path="/dico/themes"
                              element={
                                <ProtectedRoute>
                                  <DicoThemesPage />
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

                            {/* Folders */}
                            <Route
                              path="folders"
                              element={
                                <ProtectedRoute>
                                  <FolderPage />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="folders/:slug"
                              element={
                                <ProtectedRoute>
                                  <FolderBySlugPage />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="folders/:folderSlug/:textSlug"
                              element={
                                <ProtectedRoute>
                                  <TextFolderEditPage />
                                </ProtectedRoute>
                              }
                            />

                            {/* Flashcards */}
                            <Route
                              path="flashcards"
                              element={
                                <ProtectedRoute>
                                  <FlashcardsPage />
                                </ProtectedRoute>
                              }
                            />
                          </Route>

                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </Suspense>
                    </ModalProvider>
                  </MenuLearnCategoriesProvider>
                </SettingsUserProvider>
              </FoldersProvider>
            </WordsThemesProvider>
          </DicoContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
