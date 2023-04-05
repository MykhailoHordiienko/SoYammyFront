import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { PrivateRoute, RegisterRoute } from 'service/routes';
import { getAccessToken } from 'redux/auth/authSelectors';
import { current } from 'redux/auth/authOperatins';
import { useSelector, useDispatch } from 'react-redux';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Search } from '../pages/Search';
import CategoriesRecipesList from './CategoriesRecipeList/CategoriesRecipeList';

const HomePage = lazy(() => import('../pages/Home'));
const AddRecipePage = lazy(() => import('../pages/AddRecipe'));
const Register = lazy(() => import('../pages/RegisterPage'));
const Lognin = lazy(() => import('../pages/LogninPage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const WelcomPage = lazy(() => import('pages/WelcomPage'));
const FavoritePage = lazy(() => import('pages/FavoritesPage'));
const MyRecipesPage = lazy(() => import('pages/MyRecipesPage'));
const ShoppingListPage = lazy(() => import('pages/ShoppingListPage'));

export const App = () => {
  const token = useSelector(getAccessToken);

  const dispatcher = useDispatch();

  useEffect(() => {
    if (token === null) return;
    dispatcher(current());
  }, [dispatcher, token]);

  return (
    <Routes>
      {/* <>
        <Route
          path="/"
          element={<RegisterRoute restricted>{<Main />}</RegisterRoute>}
        />
        <Route
          path="/register"
          element={<RegisterRoute restricted>{<Register />}</RegisterRoute>}
        />
        <Route
          path="/signin"
          element={<RegisterRoute restricted>{<Signin />}</RegisterRoute>}
        />
        <Route
          path="/confirm-email"
          element={<RegisterRoute restricted>{<Subscribe />}</RegisterRoute>}
        />
      </> */}
      <Route
        path="/"
        element={
          // <PrivateRoute>
          <SharedLayout />
          // </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/add" element={<AddRecipePage />} />
        <Route path="/my" element={<MyRecipesPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Lognin />} />
        <Route path="/welcomePage" element={<WelcomPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/categories" element={<CategoriesPage />}>
          <Route
            path="/categories/:category"
            element={<CategoriesRecipesList />}
          />
        </Route>
        <Route path="/shopping-list" element={<ShoppingListPage />} />
      </Route>
    </Routes>
  );
};
