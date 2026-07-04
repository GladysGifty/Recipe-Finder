const apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const recipeContainer = document.getElementById("recipeContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const searchBox = document.getElementById("searchBox");

const modal = document.getElementById("recipeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalCuisine = document.getElementById("modalCuisine");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const youtubeLink = document.getElementById("youtubeLink");
const closeModal = document.getElementById("closeModal");

// ===========================
// FETCH RECIPES
// ===========================

async function getRecipes(search = "") {

    loading.style.display = "block";
    error.innerHTML = "";
    recipeContainer.innerHTML = "";

    try {

        const response = await fetch(apiURL + search);

        const data = await response.json();

        loading.style.display = "none";

        if (data.meals === null) {

            error.innerHTML = "❌ No recipes found.";

            return;

        }

        displayRecipes(data.meals);

    }

    catch (err) {

        loading.style.display = "none";

        error.innerHTML = "❌ Failed to load recipes.";

    }

}

// ===========================
// DISPLAY RECIPES
// ===========================

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

    meals.forEach(function(meal) {

        const card = document.createElement("div");

        card.className = "recipe-card";

        card.style.cursor = "pointer";

        card.innerHTML = `

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <div class="recipe-info">

                <h2>${meal.strMeal}</h2>

                <p><strong>Category:</strong> ${meal.strCategory}</p>

                <p><strong>Cuisine:</strong> ${meal.strArea}</p>

            </div>

        `;

        recipeContainer.appendChild(card);

        // ===========================
        // OPEN MODAL
        // ===========================

        card.addEventListener("click", function(){

            modal.style.display = "flex";

            modalImage.src = meal.strMealThumb;

            modalTitle.textContent = meal.strMeal;

            modalCategory.innerHTML =
            "<strong>Category:</strong> " + meal.strCategory;

            modalCuisine.innerHTML =
            "<strong>Cuisine:</strong> " + meal.strArea;

            modalIngredients.innerHTML = "";

            for(let i=1;i<=20;i++){

                let ingredient = meal["strIngredient"+i];

                let measure = meal["strMeasure"+i];

                if(ingredient && ingredient.trim()!=""){

                    let li=document.createElement("li");

                    li.textContent = measure + " " + ingredient;

                    modalIngredients.appendChild(li);

                }

            }

            modalInstructions.textContent =
            meal.strInstructions;

            youtubeLink.href = meal.strYoutube;

        });

    });

}

// ===========================
// INITIAL LOAD
// ===========================

getRecipes();

// ===========================
// SEARCH
// ===========================

searchBox.addEventListener("keyup", function(){

    getRecipes(searchBox.value.trim());

});

// ===========================
// CLOSE MODAL
// ===========================

closeModal.addEventListener("click", function(){

    modal.style.display = "none";

});

window.addEventListener("click", function(event){

    if(event.target===modal){

        modal.style.display="none";

    }

});