document.addEventListener('DOMContentLoaded', function(){
//stores the array created from the randomly selected states letters.
var selectedState = "";
//stores the fact that corresponds with the randomly selected state.
var selectedFact = "";
//Array for incorrect letter guesses
var incorrectGuessArray = [];
//stores the number of attempts based on the letter count of each state.
var totalAttempts = 0;
var gameWins = 0;
var gameLoss =0;

// Object to store US States in an array and facts in an array.
var gameData = {
    // Array containing the states to randomly choose from.
    allStates: ["OHIO", "CALIFORNIA", "TEXAS", "FLORIDA","HAWAII", "NEW YORK", "GEORGIA"],
    // Facts array, facts index matches the states index.
    stateFact: ["First to have traffic lights", "This State's flag has a bear on it", 
                "Also known as the Lone Star State", "This state is the location of Disney World", 
                "Only US state seperated by an ocean", "Also known as the Big Apple",
                "This state was named after a king of England"],
    // Array of the alpha used for validation of inputs and states with spaces
    validLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
}

//Object that contains all of our game functions
var gameFunctions = {
    //This function grabs the data from the gameData object and stores them into the global variables to use in other functions.
    randomState: function(){
        var gameDataIndex = Math.floor(Math.random() * gameData.allStates.length);
        //randomly selects a state and converts into an array and store into variable selectedState.
        selectedState = gameData.allStates[gameDataIndex].split("");
        //Selects corresponding fact from the gameData object and stores into variable selectedFact.
        selectedFact = gameData.stateFact[gameDataIndex];
        //Sets totalAttemps to length of state name + 5
        totalAttempts = selectedState.length + 5;
        //prints facts about the state to the <p> with ID stateFact in the HTML code.
        document.getElementById("stateFact").innerHTML = selectedFact;
    },

    //This function creates dashes in place of each letter of the random state selected and adds them to the html code.
    displayState: function(){
        //for loop to create a dash placeholder for each letter.
        for (var i = 0; i < selectedState.length; i++){
            var letterHolder = "";
            var letterDash = "";

            //Checks current index for a space
            if (selectedState[i] === " "){ //If True
                //Creates a <span> element
                letterHolder = document.createElement("SPAN");
                //creates a space and stores it into letterDash
                letterDash = document.createTextNode("\xa0");
            }
            else{ //If False
            //creates a <span> element and sets letterHolder to it.
            letterHolder = document.createElement("SPAN");
            //sets attribute id of created element to value of the index.
            letterHolder.setAttribute("id", selectedState[i]);
            //sets arttribute id of data-letter with value equal to value of the current index
            letterHolder.setAttribute("data-letter", selectedState[i]);
            //creates text and stores it into letterDash
            letterDash = document.createTextNode("_ ");
            }
            //stores the text in letterDash into the <span> element in letterHolder
            letterHolder.appendChild(letterDash);
            //appends the <span> with text and inserts it into the element with id selectedState
            document.getElementById("selectedState").appendChild(letterHolder);
        }
    },

    //Function that checks user key input against the letters of the US State.
    onGuessInput: function(storedLetter){
        //converts storedLetter to uppercase
        var storedLetter = storedLetter.toUpperCase();
        // declaring variables
        var incorrectLetter = "";
        var incorrectHolder = "";

        //If function to check if key pressed is NOT a letter
        if(!gameData.validLetters.includes(storedLetter)){
            alert("Your input was not a letter, please try again!");
        }

        //If function to check is key pressed is NOT in selectedState array AND is in array validLetters AND NOT in incorrectGuessArray
        if (!selectedState.includes(storedLetter) && gameData.validLetters.includes(storedLetter) && !incorrectGuessArray.includes(storedLetter)){
            //Adds incorrect letter to the incorrectGuessArray. Stops this if condition to run if the incorrect letter was already guessed.
            incorrectGuessArray.push(storedLetter);
            //creates a span element and stores it into incorrectHolder
            incorrectHolder = document.createElement("SPAN");
            //creates text of stored letter with a space at the end and stors it into incorrectLetter.
            incorrectLetter = document.createTextNode(storedLetter+" ");
            //adds text in incorrectLetter into the span created in incorrectHolder
            incorrectHolder.appendChild(incorrectLetter);
            //Adds the created span with text into the HTML element with the id incorrectLetters.
            document.getElementById("incorrectLetters").appendChild(incorrectHolder);
            //Decrease totalAttempts by 1
            totalAttempts--;
            console.log(incorrectGuessArray);
        }
        //If function to check if letter is in the US State array selectedState
        if (selectedState.includes(storedLetter)){
            console.log("correct letter");
        }

    }


}
//Run gameFunctions to start game.
gameFunctions.randomState();
gameFunctions.displayState();

//Event listener for keypress, function calls onGuessInput function passing through the key pressed.
document.addEventListener("keypress", function(userKeyPress){
    gameFunctions.onGuessInput(userKeyPress.key);
    document.getElementById("attempsLeft").innerHTML = totalAttempts;
});

//Event listener to continually update attempsLeft with the current value of totalAttempts
document.getElementById("attempsLeft").innerHTML = totalAttempts;

console.log(selectedState);
console.log(selectedFact);
console.log(totalAttempts);
console.log(incorrectGuessArray);
console.log("total attemps" +totalAttempts);
});
