// Assignment code here

function generatePassword() {
  //ask user for length of password.
  var length = passwordLength();
  //get an array of boolean values to determine what charaters the user wants.
  //bool array = [lower case, uppercase, numbers, special characters]
  var characters = passwordCharaterTypes();
  //ask user to confirm their selections
  passwordSelectionConfirmation(length, characters);

  //create password
  return passwordCreation(length, characters);  
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
