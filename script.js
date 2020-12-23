const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

//search meal and fetch from api
const searchMeal = (e) => {
  e.preventDefault();
  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    const fetchSearch = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await res.json();
      console.log(data);
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = ` There are no search results. Try again`;
      } else {
        mealsEl.innerHTML = data.meals
          .map(
            (meal) =>
              `<div class='meal'>
				<img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
				<div class='meal-info' data-mealID='${meal.idMeal}'>
				
					<h3>${meal.strMeal}</h3>
				</div>
			</div> `
          )
          .join('');
      }
      // clear search text
      search.value = '';
    };
    fetchSearch();
  } else {
    alert('this is empty, enter something in');
  }
};
//Event listeners
submit.addEventListener('submit', searchMeal);
