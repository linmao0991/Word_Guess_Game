document.addEventListener('DOMContentLoaded', function(){
    //stores the array created from the randomly selected states letters.
    var selectedState = "";
    //stores the fact that corresponds with the randomly selected state.
    var selectedFact = "";
    //Array for incorrect letter guesses
    var guessArray = [];
    //stores the number of attempts based on the letter count of each state.
    var totalAttempts = 0;
    //Number of inputs that are correct
    var correctInput = 0;
    //letter count of State, excluding spaces.
    var stateLetterCount = 0;
    // The current state selected for game
    var currentState = "";
    //checkRepeatLetters function global variable
    var checkRepeatFuncVar = "";
    //Array for states correctly guessed, array used to not repeat correctly guessed states.
    var statesGuessed = [];
    //Game wins
    var gameWins = 0;
    //Game losses
    var gameLoss =0;

    // Object to store US States in an array and facts in an array.
    var gameData = {
        // Array containing the states to randomly choose from.
        allStates: ["OHIO", "CALIFORNIA", "TEXAS", "FLORIDA","HAWAII", "NEW YORK", "GEORGIA", "NEW HAMPSHIRE", "ALABAMA","ALASKA","ARIZONA"],
        // Facts array, facts index matches the states index.
        stateFact: ["First to have traffic lights.", 
                    "This State's flag has a bear on it.", 
                    "Also known as the Lone Star State", 
                    "This state is where Disney World is located.", 
                    "Only US state seperated by an ocean.", 
                    "Also known as the Big Apple.",
                    "This state was named after a king of England.",
                    'This state is also known as "The Granite State".',
                    "The Confederate flag was designed and first flown in this state.",
                    "This state was purchased from another country for $7.2 million.",
                    "The Grand Canyon is located in this state.",
                    ],
        // Array of the alpha used for validation of inputs and states with spaces
        validLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    }

    //Object that contains all of our game functions
    var gameFunctions = {

        //Function clears all elements with specified IDs and sets global variable to defualt values. This sets up for new round of games.
        resetGame: function(){
            selectedState = "";
            selectedFact = "";
            currentState = ""; 
            guessArray = [];
            totalAttempts = 0;
            correctInput = 0;
            stateLetterCount = 0;
            document.getElementById("stateFact").innerHTML = "";
            document.getElementById("attempsLeft").innerHTML = "";
            document.getElementById("selectedState").innerHTML = "";
            document.getElementById("incorrectLetters").innerHTML = "";
            gameFunctions.randomState();
            gameFunctions.displayState();
        },
        // Function clears everything to start a new game.
        newGame: function(){
            selectedState = "";
            selectedFact = "";
            currentState = ""; 
            guessArray = [];
            totalAttempts = 0;
            correctInput = 0;
            stateLetterCount = 0;
            statesGuessed = [];
            gameWins = 0;
            gameLoss =0;
            document.getElementById("stateFact").innerHTML = "";
            document.getElementById("attempsLeft").innerHTML = "";
            document.getElementById("selectedState").innerHTML = "";
            document.getElementById("incorrectLetters").innerHTML = "";
            document.getElementById("gameWins").innerHTML = "";
            document.getElementById("gameLosses").innerHTML = "";
            gameFunctions.randomState();
            gameFunctions.displayState();
        },

        //This function grabs the data from the gameData object and stores them into the global variables to use in other functions.
        randomState: function(){
            //sets the variable in checkRepeatLetters to space, to look for spaces in State Name
            checkRepeatFuncVar = " ";
            // Stores the number of spaces in the State name
            var stateSpaceCount = 0;
            //Stores a random number from 0 to lenght of array of states and stores into gameDataIndex
            var gameDataIndex = Math.floor(Math.random() * gameData.allStates.length);
            //randomly selects a state and converts into an array and store into variable selectedState.
            currentState = (gameData.allStates[gameDataIndex]);
            //While loops untill currentState is not in the array stateGussed
            while (statesGuessed.indexOf(currentState) > 0){
                gameDataIndex = Math.floor(Math.random() * gameData.allStates.length);
                currentState = (gameData.allStates[gameDataIndex]);
            }
            selectedState = gameData.allStates[gameDataIndex].split("");
            //Selects corresponding fact from the gameData object and stores into variable selectedFact.
            selectedFact = gameData.stateFact[gameDataIndex];
            //Sets totalAttemps to length of state name + 5
            totalAttempts = selectedState.length + 5;
            //Call function checkRepeatLetters to return repeat spaces and subtract from array length to get letter count
            stateSpaceCount = selectedState.filter(gameFunctions.checkRepeatLetters).length;
            //Subtracts the array length of the selectedState array and subtracting the emtpy spaces to get letter count.
            stateLetterCount = selectedState.length - stateSpaceCount;
            //Clears the checRepeatFuncVar for use in other functions
            checkRepeatFuncVar = "";
            //prints facts about the state to the <p> with ID stateFact in the HTML code.
            document.getElementById("stateFact").innerHTML = selectedFact;
            console.log(selectedState);
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
                //sets attribute class of created element to value of the index.
                letterHolder.setAttribute("class", selectedState[i]);
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
            //Stores incorrect Letter
            var incorrectLetter = "";
            //Stores new element to append to html
            var incorrectHolder = "";

            //If function to check if key pressed is NOT a letter
            if(!gameData.validLetters.includes(storedLetter)){
                alert("Your input was not a letter, please try again!");
            }

            //If function to check if key pressed is NOT in selectedState array AND is in array validLetters AND NOT in guessArray
            if (!selectedState.includes(storedLetter) && gameData.validLetters.includes(storedLetter) && !guessArray.includes(storedLetter)){
                //Adds incorrect letter to the guessArray. Stops this if condition to run if the incorrect letter was already guessed.
                guessArray.push(storedLetter);
                //creates a span element and stores it into incorrectHolder
                incorrectHolder = document.createElement("SPAN");
                //creates text of stored letter with a space at the end and stores it into incorrectLetter.
                incorrectLetter = document.createTextNode(storedLetter+" ");
                //adds text in incorrectLetter into the span created in incorrectHolder
                incorrectHolder.appendChild(incorrectLetter);
                //Adds the created span with text into the HTML element with the id incorrectLetters.
                document.getElementById("incorrectLetters").appendChild(incorrectHolder);
                //Decrease totalAttempts by 1
                totalAttempts--;
            }
            //If function to check if letter is in the US State array selectedState, if storedLetter is no already gussed, and if storedLetter is no a sapce.
            if (selectedState.includes(storedLetter) && !guessArray.includes(storedLetter) && !storedLetter.replace(/\s/g, '').length == 0){
                //Adds correct letter to guessArray.
                guessArray.push(storedLetter);
                //declaring local variables
                var repeatLetter = 0;
                //Sets the value we want to check for in checkRepeatLetters function
                checkRepeatFuncVar = storedLetter;
                //Stores the number of repeated letters in State name
                repeatLetter = selectedState.filter(gameFunctions.checkRepeatLetters).length;
                //For loop to go through letter place holder and replace place holder with correct letter input.
                for (var i = 0; i < repeatLetter; i++){
                    //Updates the html letter place holder with the correctly gussed letter.
                    document.getElementsByClassName(storedLetter)[i].innerHTML = storedLetter+" ";
                     //Increments correct input to represent the number of correct letter inputs
                    correctInput++;
                }
            }

           setTimeout(function(){
               //checks if the number of correct inputs matches the letter count of the current state
                if (correctInput == stateLetterCount){
                //Increments gameWins by 1
                gameWins++;
                //Adds the corretly gussed state into the stateGussed array
                statesGuessed.push(currentState);
                // Updates html with the curren gameWins value.
                document.getElementById("gameWins").innerHTML = gameWins;
                //Alerts user that they correctly gussed the state and diplays the string value of currentState
                gameFunctions.playEagleScream();
                alert("Correct! The state was: "+currentState);
                //Calls function resetGame.
                gameFunctions.resetGame();
            }
           },500);
            

            //Check if the array length of statesGuessed equals allStates, if true the user guessed all the states.
            if (statesGuessed.length == gameData.allStates.length){
                alert("We reached the end! Lets see the final score!");
                alert("Games Won: "+gameWins+ " / Games Lost: "+gameLoss);
                //If else statement to alert the user of winning or losing, then calling the newGame function to clear all the scores and start a new game.
                if(gameWins > gameLoss){
                    alert("You Won!");
                    gameFunctions.newGame();
                }
                else {
                    alert("You Lost!");
                    gameFunctions.newGame();
                }
            }

            //checks to see if total attemps reached 0.
            if (totalAttempts == 0){
                // Increments gameLoss by 1
                gameLoss++;
                // Updates html with current gameLoss value.
                document.getElementById("gameLosses").innerHTML = gameLoss;
                //Calls function resetGame.
                gameFunctions.resetGame();
            }
        },
        //Function to get array based on conditional and return array elements that pass the conditional
        checkRepeatLetters: function(arrayToCheck){
            return arrayToCheck == checkRepeatFuncVar;
        },
        //Function plays the audo in the audio element with the id eagleScream
        playEagleScream: function(){
            document.getElementById("eagleScream").play();
        }

    }
    //Run gameFunctions and display game information
    gameFunctions.randomState();
    gameFunctions.displayState();
    document.getElementById("gameWins").innerHTML = gameWins;
    document.getElementById("gameLosses").innerHTML = gameLoss;
    document.getElementById("attempsLeft").innerHTML = totalAttempts;

    //Event listener for keypress, function calls onGuessInput function passing through the key pressed.
    document.addEventListener("keypress", function(userKeyPress){
        //Calls function onGuessInput and passing through the key pressed
        gameFunctions.onGuessInput(userKeyPress.key);
        //updates html with totalAttempts value.
        document.getElementById("attempsLeft").innerHTML = totalAttempts;
    });
});