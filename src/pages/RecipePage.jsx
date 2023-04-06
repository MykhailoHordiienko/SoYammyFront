import { RecipePageHero } from 'components/Recipe/RecipePageHero';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from 'redux/recipes/recipesOperations';
import {
//   selectError,
//   selectIsLoading,
  selectRecipes,
} from 'redux/recipes/recipesSelectors';

const RecipePage = () => {
  const recipes = useSelector(selectRecipes);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);
  const dispatch = useDispatch();

  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
  }, [dispatch, recipeId]);

  return (
    <main>
      <RecipePageHero data={recipes.data} />
    </main>
  );
};

export default RecipePage;
