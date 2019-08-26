document.addEventListener('DOMContentLoaded', function(){

//stores the array created from the randomly selected states letters.
var selectedState = "";
//stores the fact that corresponds with the randomly selected state.
var selectedFact = "";
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
    validLetters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
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


}

gameFunctions.randomState();
gameFunctions.displayState();
console.log(selectedState);
console.log(selectedFact);
console.log(totalAttempts);
});