import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { getAccessToken } from 'redux/auth/authSelectors';
import { current } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
// import { useAuth } from 'utils/hooks';

import { PrivateRoute, PublicRoute } from 'service/routes';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Suspense } from 'react';
import { Loader } from './Loader/Loader';
import { Helmet } from 'react-helmet-async';

const Register = lazy(() => import('pages/RegisterPage'));
const Signin = lazy(() => import('pages/SigninPage'));
const MainPage = lazy(() => import('pages/MainPage'));
const AddRecipe = lazy(() => import('pages/AddRecipe'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage'));
const WellcomPage = lazy(() => import('pages/WellcomPage'));
const ShoppingListPage = lazy(() => import('pages/ShoppingListPage'));
const MyRecipesPage = lazy(() => import('pages/MyRecipesPage'));
const SearchPage = lazy(() => import('pages/Search'));
const RecipePage = lazy(() => import('pages/RecipePage'));
const CategoriesPage = lazy(() => import('pages/CategoriesPage'));
const CategoriesRecipesList = lazy(() =>
  import('./CategoriesRecipeList/CategoriesRecipeList')
);
const ErrorPage = lazy(() => import('pages/ErrorPage'));

export const App = () => {
  const dispatcher = useDispatch();
  // const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatcher(current());
  }, [dispatcher]);

  // if (isRefreshing) {
  //   return <b>Refreshing user...</b>;
  // }

  return (
    <>
      <Helmet>
        <title>SoYummy</title>
      </Helmet>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/welcome"
            element={
              <PublicRoute component={WellcomPage} redirectTo="/" restricted />
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute component={Register} redirectTo="/" restricted />
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute component={Signin} redirectTo="/" restricted />
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute component={SharedLayout} redirectTo="/welcome" />
            }
          >
            <Route
              index
              element={
                <PrivateRoute component={MainPage} redirectTo="/signin" />
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute component={AddRecipe} redirectTo="/signin" />
              }
            />
            <Route
              path="/favorite"
              element={
                <PrivateRoute component={FavoritesPage} redirectTo="/signin" />
              }
            />
            <Route
              path="/shopping-list"
              element={
                <PrivateRoute
                  component={ShoppingListPage}
                  redirectTo="/signin"
                />
              }
            />
            <Route
              path="/my"
              element={
                <PrivateRoute component={MyRecipesPage} redirectTo="/signin" />
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute component={SearchPage} redirectTo="/signin" />
              }
            />
            <Route
              path="/recipes/:recipeId"
              element={
                <PrivateRoute component={RecipePage} redirectTo="/signin" />
              }
            />

            <Route
              path="/categories"
              element={
                <PrivateRoute component={CategoriesPage} redirectTo="/signin" />
              }
            >
              <Route
                path="/categories/:category"
                element={<CategoriesRecipesList />}
              />
              <Route />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
