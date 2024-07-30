//get the username from the localstorage and defined from where the user enter the website
const welcomeUser = () => {
    const welcome = document.getElementById("WelcomeUsername");
    const userinfoLogin = JSON.parse(localStorage.getItem("userinfoLogin"))
    const usernameRegister = localStorage.getItem("usernameRegister")
    if(!usernameRegister){
        welcome.textContent = `Welcome back ${userinfoLogin.username.charAt(0).toUpperCase() + userinfoLogin.username.slice(1)}`
    }else{
        welcome.textContent = `Welcome back ${usernameRegister.charAt(0).toUpperCase() + usernameRegister.slice(1)}`
    }
}
welcomeUser()

//create day select in the dom because its simpler and display the exercises and the recepies witn an EventListener change
const createDaySelect = () => {
    const container = document.getElementById('day_number_container'); 
    const select = document.createElement('select');
    select.setAttribute('name', 'day_number');
    select.setAttribute('id', 'day_number');
    const firstOption = document.createElement('option');
    firstOption.textContent = ""
    select.appendChild(firstOption);

    for (let i = 1; i <= 14; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.textContent = i;
        select.appendChild(option);
    }
    container.appendChild(select);
    select.addEventListener('change', function(){
        const main = document.querySelector("main")
        const existingMessage = document.querySelector("#dayMessage");
        if (existingMessage) {
            main.removeChild(existingMessage);
        }
        const message = document.createElement("h1");
        message.setAttribute("id", "dayMessage");
        message.textContent = `Great! Let's start our day ${select.value}`;
        main.insertBefore(message, main.firstChild);
        dayExercises()
        dayRecepies()
    });
} 

//fetching the right exercises depending on the intensity 
const dayExercises = async() => { 
    const userIntensityRegister = localStorage.getItem("intensityRegister")
    const userinfoLogin = JSON.parse(localStorage.getItem("userinfoLogin"))
    let userIntensity;
    if(!userIntensityRegister){
         userIntensity = userinfoLogin.intensity
    }else{
        userIntensity = userIntensityRegister
    }
    console.log(userIntensity);
    if (userIntensity === "low"){
        try {
            const response = await fetch('/fitness/beginnerExercises', {
                method: 'GET',
            });
            const result = await response.json();
                displayExercises(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    }else if (userIntensity === "medium"){
        try {
            const response = await fetch('/fitness/intermediateExercises', {
                method: 'GET',
            });
            const result = await response.json();
                displayExercises(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    }else if (userIntensity === "high"){
        try {
            const response = await fetch('/fitness/expertExercises', {
                method: 'GET',
            });
            const result = await response.json();
                displayExercises(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    
};

//fetching the recepies
const dayRecepies = async() => { 
    try {
    const response = await fetch('/fitness/recepies', {
        method: 'GET',
    });
    const result = await response.json();
        displayRecepies(result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

//display the recepies in the dom with a loop
const displayRecepies = (recepies) => {
    const container = document.getElementById('recepies');
    const typeMeals = document.getElementsByClassName("typeMeals")
    container.innerHTML = '';
   
    recepies.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const title = document.createElement('h3');
        title.textContent = recipe.title;
        recipeDiv.appendChild(title);

        const ingredients = document.createElement('p');
        ingredients.textContent = `Ingredients: ${recipe.ingredients}`;
        recipeDiv.appendChild(ingredients);

        const servings = document.createElement('p');
        servings.textContent = `Servings: ${recipe.servings}`;
        recipeDiv.appendChild(servings);

        const instructionsClick = document.createElement('p');
        instructionsClick.textContent = "Click for the instructions"
        instructionsClick.classList.add("click")
        recipeDiv.appendChild(instructionsClick);

        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${recipe.instructions}`;
        instructions.style.display = 'none';
        recipeDiv.appendChild(instructions);

        recipeDiv.addEventListener('click', () => {
            const expanded = recipeDiv.classList.toggle('expanded');
            instructions.style.display = expanded ? 'block' : 'none';
            instructionsClick.style.display = expanded ? 'none' : 'block';
        });
        container.appendChild(recipeDiv);
        if (recepies.length > 0) {
            Array.from(typeMeals).forEach(element => {
                element.style.display = 'block';
            });
        } else {
            Array.from(typeMeals).forEach(element => {
                element.style.display = 'none';
            });
        }
    });
    
};

//display the exercises in the dom with a loop
const displayExercises = (exercises) => {
    const container = document.getElementById('exercises');
    container.innerHTML = '';
    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.classList.add('exercise');

        const name = document.createElement('h3');
        name.textContent = exercise.name;
        exerciseDiv.appendChild(name);

        const type = document.createElement('p');
        type.textContent = `Type: ${exercise.type}`;
        exerciseDiv.appendChild(type);

        const muscle = document.createElement('p');
        muscle.textContent = `Muscle: ${exercise.muscle}`;
        exerciseDiv.appendChild(muscle);

        const equipment = document.createElement('p');
        equipment.textContent = `Equipment: ${exercise.equipment}`;
        exerciseDiv.appendChild(equipment);

        const difficulty = document.createElement('p');
        difficulty.textContent = `Difficulty: ${exercise.difficulty}`;
        exerciseDiv.appendChild(difficulty);

        const instructionsClick = document.createElement('p');
        instructionsClick.textContent = "Click for the instructions"
        instructionsClick.classList.add("click")
        exerciseDiv.appendChild(instructionsClick);

        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${exercise.instructions}`;
        instructions.style.display = 'none';
        exerciseDiv.appendChild(instructions);

        exerciseDiv.addEventListener('click', () => {
            const expanded = exerciseDiv.classList.toggle('expanded');
            instructions.style.display = expanded ? 'block' : 'none';
            instructionsClick.style.display = expanded ? 'none' : 'block';
        });

        container.appendChild(exerciseDiv);
    });
};

createDaySelect()

//reminder for drinking water
function drinkWater(){
    alert('Drink Water')
}
setInterval(drinkWater, 30 * 60 * 1000)