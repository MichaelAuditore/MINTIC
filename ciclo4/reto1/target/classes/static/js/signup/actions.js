let registerButton = $(".registerButton");
registerButton.click(registerEvent);

/**
 * @function registerEvent
 * @description register a user on DB, first checks if user is able to be saved
 */
async function registerEvent() {
  let validRegister = await validateRegister();

  if (validRegister.status) {
    let body = {
      name: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };
    signupRequest(body);
  }
  setErrorMessage(validRegister?.fields);
}

/**
 * @function setErrorMessage
 * @description show errors of each field on screen client
 * @param {*} errors
 */
function setErrorMessage(errors) {
  let fields = ["email", "username", "password", "c_password"];
  let errorFields = Object.keys(errors);

  errorFields.forEach((key) => {
    $(`.error-${key}`).remove();
    let error = $(`<p class="error-${key}">${errors[key]}</p>`);
    $(`#${key}`).after(error);
  });
  fields.forEach((field) => {
    if (!errorFields.includes(field)) {
      $(`.error-${field}`).remove();
    }
  });
}

/**
 * @function validateRegister
 * @description checks if user exists, fill all the fields, and email is valid
 * @returns object with status and errors fields
 */
async function validateRegister() {
  let validRegister = {
    status: true,
    fields: {},
  };
  let requiredValues = requiredFields();
  if (requiredValues.status) {
    if (isValidEmail()) {
      let validEmail = await validateEmail();
      if (!validEmail) {
        if (samePasswords()) {
          validRegister.fields = {};
          return validRegister;
        } else {
          validRegister.status = false;
          validRegister.fields["c_password"] = "Las contraseñas no coinciden";
        }
      } else {
        validRegister.status = false;
        validRegister.fields["email"] = "El email ya se encuentra registrado";
      }
    } else {
      validRegister.status = false;
      validRegister.fields["email"] = "El email no es válido";
    }
  } else {
    validRegister.status = false;
    validRegister.fields = requiredValues.fields;
  }

  return validRegister;
}

/**
 * @function requiredFields
 * @description checks if user fill all fields on signup form
 * @returns object with status of validation and fields with errors
 */
function requiredFields() {
  let requiredFields = {
    status: true,
    fields: {},
  };
  if ($("#email").val() == "") {
    requiredFields.status = false;
    requiredFields.fields["email"] = "Digite un correo electrónico";
  }
  if ($("#username").val() == "") {
    requiredFields.status = false;
    requiredFields.fields["username"] = "Digite un nombre de usuario";
  }
  if ($("#password").val() == "") {
    requiredFields.status = false;
    requiredFields.fields["password"] = "Digite una contraseña";
  }
  if (!samePasswords()) {
    requiredFields.status = false;
    requiredFields.fields["c_password"] = "Las contraseñas no coinciden";
  }
  return requiredFields;
}

/**
 * @function samePasswords
 * @description checks if two string values are equal or not
 * @returns boolean value
 */
function samePasswords() {
  return (
    $("#password").val() === $("#c_password").val() &&
    $("#password").val().length > 0
  );
}

/**
 * @function validateEmail
 * @description checks if an email is not registered yet on DB
 * @returns boolean value
 */
async function validateEmail() {
  let email = $("#email").val();
  let emailExists = await emailRequest(email);

  return emailExists;
}

/**
 * @function isValidEmail
 * @description check if an email has the right structure
 * @returns boolean value
 */
function isValidEmail() {
  let emailValue = $("#email").val();
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(emailValue);
}
