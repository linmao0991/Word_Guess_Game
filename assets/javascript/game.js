document.addEventListener('DOMContentLoaded', function(){

var selectedState = "";
var selectedFact = "";
var totalAttempts = 0;
var gameWins = 0;
var gameLoss =0;

// Object to store US States in an array and facts in an array
var gameData = {
    // US States array
    allStates: ["Ohio", "California", "Texas", "Florida","Hawaii", "New York", "Georgia"],
    // Facts array, facts index matches the states index.
    stateFact: ["First to have traffic lights", "This State's flag has a bear on it", "Also known as the Lone Star State", "This state is the location of Disney World", "Only US state seperated by an ocean", "Also known as the Big Apple","This state was named after a king of England"]
}

var gameFunctions = {

    //randomState function selects state from the gameData object and stores necessary information into variables used for the game.
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
    }

}

gameFunctions.randomState();
console.log(selectedState);
console.log(selectedFact);
console.log(totalAttempts);
});