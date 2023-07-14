// Assignment code here

function generatePassword() {
  //ask user for length of password.
  var length = passwordLength();

  //check if user inputed a length
  if (length !== null) {
    //get an array of boolean values to determine what charaters the user wants.
    //bool array = [lowercase, uppercase, numbers, special characters]
    var characters = passwordCharaterTypes();
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
function passwordCharaterTypes() {
  //run an infinite loop until a user hits ok to one of the 4 following prompts.
  //loop will end when it hits a line that returns a value.
  while(true) {
    //get user input.
    var lower = window.confirm("Would you like to have lowercase characters?  Hit ok for yes and cancel for no.");
    var upper = window.confirm("Would you like to have uppercase characters?  Hit ok for yes and cancel for no.");
    var numbers = window.confirm("Would you like to have numbers?  Hit ok for yes and cancel for no.");
    var special = window.confirm("Would you like to have special characters?  Hit ok for yes and cancel for no.");
    
    //input validation, at least one ok was hit return an array.  otherwise let the user know and ask again.
    if (lower || upper || numbers || special) {
      return [lower, upper, numbers, special];
    }
    else {
      window.alert("Can not generate a password with no characters.  Please answer those 4 prompts again.")
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
