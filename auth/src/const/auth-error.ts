import  {
    PassportLocalOptions,
    PassportLocalErrorMessages
  } from 'mongoose';
  
let options: PassportLocalOptions = <PassportLocalOptions>{};
options.usernameField = 'email';

let errorMessages: PassportLocalErrorMessages = {};
errorMessages.MissingPasswordError = 'No password was given';
errorMessages.AttemptTooSoonError = 'Account is currently locked. Try again later';
errorMessages.TooManyAttemptsError = 'Account locked due to too many failed login attempts';
errorMessages.NoSaltValueStoredError = 'Authentication not possible. No salt value stored';
errorMessages.IncorrectPasswordError = 'Password or email are incorrect';
errorMessages.IncorrectUsernameError = 'Password or email are incorrect';
errorMessages.MissingUsernameError = 'No email was given';
errorMessages.UserExistsError = 'A user with the given email is already registered';

options.errorMessages = errorMessages;


export {options as authOptions}