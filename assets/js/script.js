// Assignment code here

function generatePassword() {
  //ask user for length of password.
  var length = passwordLength();

  //check if user inputed a length
  if (length !== null) {
    //get an array of boolean values to determine what charaters the user wants.
    //bool array = [lowercase, uppercase, numbers, special characters]
    var characters = passwordCharacterTypes();
    //ask user to confirm their selections
    var confirmation = passwordSelectionConfirmation(length, characters);

    if (confirmation) {
      //create password
      return passwordCreation(length, characters); 
    }
    else {
      //if user does not confirm and this function does not return null then the textbox on the screen will display undefined.
      //this way it will still say "Your Secured Password" or the previous password if the user cancels.
      return null;
    }
  } 
  else {
    //if user cancels and this function does not return null then the textbox on the screen will display undefined.
    //this way it will still say "Your Secured Password" or the previous password if the user cancels.
    return length;
  }
}

//create function to ask user for the length of the password.
function passwordLength() {
  //run an infinite loop until a user inputs a correct prompt or hits cancel on the first prompt of the loop.
  //loop will end when it hits a line that returns a value.
  //I have used while loops in my past and there was a bonus asking us about while loops.
  while(true)
  {
    //give promp and ask for user input.
    var length = window.prompt("How many characters would you like your password to contain.\nPlease input a number between 8 and 128");

    //Check if user cancelled the prompt.
    if (length !== null) {
      //validation that it is a number between 8 and 128.
      //Went to https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript to find info on how to check 
      //if user input is a number or a charater/string.  Also credited in the README file.
      /*Greg Peckory, et al. “Check If Input Is Number or Letter Javascript.” Stack Overflow, 4 Aug. 2013, 
          stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript. */
      if (isNaN(length)) {
        window.alert("Password length must be a number.  Please try again.");
      }
      else if (length < 8) {
        window.alert("Password length must be at least 8 character.  Please try again.");
      }
      else if (length > 128) {
        window.alert("Password length must be less than 128 character.  Please try again.");
      }
      else {
        return length;
      }
    }
    else {
      return null;
    }
  }
}

//create a function to ask the user a series of questions to determine how to generate the password.
function passwordCharacterTypes() {
  //run an infinite loop until a user hits ok to one of the 4 following prompts.
  //loop will end when it hits a line that returns a value.
  while(true) {
    //get user input.
    var lower = window.confirm("Would you like to have lowercase characters?\nHit Ok for yes and Cancel for no.");
    var upper = window.confirm("Would you like to have uppercase characters?\nHit Ok for yes and Cancel for no.");
    var numbers = window.confirm("Would you like to have numbers?\nHit Ok for yes and Cancel for no.");
    var special = window.confirm("Would you like to have special characters?\nHit Ok for yes and Cancel for no.");
    
    //input validation, at least one ok was hit return an array.  otherwise let the user know and ask again.
    if (lower || upper || numbers || special) {
      return [lower, upper, numbers, special];
    }
    else {
      window.alert("Can not generate a password with no characters.  Please answer those 4 prompts again.")
    }
  }
}

//ask the user to confirm there selection and return the value
//characters = [lowercase, uppercase, numbers, special characters]
function passwordSelectionConfirmation (length, characters) {
  //define variables to use in the message.
  var lowerCharacters = "no";
  var upperCharacters = "no";
  var numberCharacters = "no";
  var specialCharacters = "no";

  //check if the varaibles need to say yes instead of no.
  if (characters[0]) {
    lowerCharacters = "yes";
  }
  if (characters[1]) {
    upperCharacters = "yes";
  }
  if (characters[2]) {
    numberCharacters = "yes";
  }
  if (characters[3]) {
    specialCharacters = "yes"
  }

  var message = "Please confirm that you want to create a password using the rules shown below.\n\nLength: " + length + "\n";
  message += "Lowercase: " + lowerCharacters + "\nUppercase: " + upperCharacters + "\nNumbers: " + numberCharacters + "\nSpecial Characters: " + specialCharacters;
  message += "\n\nHit Ok to confirm or Cancel to cancel.";
  return window.confirm(message);
}

//Create a function that will generate a password based off the criterias that the user gave.
function passwordCreation(length, characters) {
  //define variables
  //create an array to store the characters that can be used in the password.
  var passwordCharacters = [];
  //Went to https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters to learn about regular expressions.
  //also credited in the README file.
  /*Hadzhiev, Borislav. “Check If String Contains Special Characters in JavaScript.” Bobbyhadz, 1 Jan. 2023, 
      bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters. */
  var lowerCriteria = /[a-z]/;;
  var upperCriteria = /[A-Z]/;;
  var numberCriteria = /[0-9]/;;
  var specialCriteria = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;;

  //add necessary characters to the array.
  //lowercase, 26
  if (characters[0]) {
    passwordCharacters.push("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
  }
  //uppercase, 26
  if (characters[1]) {
    passwordCharacters.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  }
  //numbers, 10
  if (characters[2]) {
    passwordCharacters.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
  }
  //special, 33
  if (characters[3]) {
    passwordCharacters.push(" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~")
  }
  while (true) {
    var passwordString = "";

    //create the password
    for (var i = 0; i < length; i++) {
      var index = Math.floor(Math.random() * passwordCharacters.length);
      passwordString += passwordCharacters[index];
    }

    //check to see if the created password meets the criteria, if it does exit the function by returning it, otherwise generate a new password.
    if ((!characters[0] || lowerCriteria.test(passwordString)) &&
    (!characters[1] || upperCriteria.test(passwordString)) &&
    (!characters[2] || numberCriteria.test(passwordString)) &&
    (!characters[3] || specialCriteria.test(passwordString))) {
      return passwordString;
    }
  }
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);