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
import { DicoPublicPage } from "./pages/DicoPage/Dico/DicoPublicPage";
import { MyDicoPage } from "./pages/DicoPage/Dico/MyDicoPage";
import { ModalProvider } from "./hooks/useModal";
import { MenuLearnCategoriesProvider } from "./hooks/useMenuLearnCategories";
import { LearnCategoriesPage } from "./pages/Learn/LearnCategoriesPage";
import { LearnByCategoryPage } from "./pages/Learn/LearnByCategoryPage";
import { LearnAllLessonsPage } from "./pages/Learn/LearnAllLessonsPage";
import { AddWordPage } from "./pages/DicoPage/Dico/AddWordPage";
import { AddSingleWordPage } from "./pages/DicoPage/Dico/AddSingleWordPage";
import { ImportWordPage } from "./pages/DicoPage/Dico/ImportWordPage";
import { SettingsUserProvider } from "./hooks/useSettingsUser";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import { WordsThemesProvider } from "./hooks/useWordsThemes";
import { DicoThemesPage } from "./pages/DicoPage/Themes/DicoThemesPage";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { FoldersProvider } from "./hooks/useFolders";
import { FolderBySlugPage } from "./pages/FolderPage/FolderBySlugPage";
import { TextFolderEditPage } from "./pages/FolderPage/TextFolderEditPage";
import { DicoContextProvider } from "./hooks/useDico";
import FlashcardsPage from "./pages/FlashcardPage/FlashcardsPage";

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
                          {/* Quiz */}
                          {/*                           <Route
                            path="quiz"
                            element={
                              <ProtectedRoute>
                                <QuizPage />
                              </ProtectedRoute>
                            }
                          /> */}
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
