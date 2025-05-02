const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const fNameInput = document.getElementById("f_name");
const lNameInput = document.getElementById("l_name");
const passwordInput = document.getElementById("password");
const iconError = document.querySelectorAll(".icon-error");
console.log("Form Caught");

[fNameInput, lNameInput, emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");

    const icon = input.nextElementSibling;
    if (icon?.classList.contains("icon-error")) {
      icon.style.display = "none";
    }

    const error = document.getElementById(`${input.id}-error`);
    if (error) error.textContent = "";
  });
});

const handleSubmit = (e) => {
  e.preventDefault();

  const emailError = document.getElementById("email-error");
  const fNameError = document.getElementById("f_name-error");
  const lNameError = document.getElementById("l_name-error");
  const passwordError = document.getElementById("password-error");

  fNameError.classList.remove("input-error");
  lNameError.classList.remove("input-error");
  emailError.classList.remove("input-error");
  passwordError.classList.remove("input-error");
  fNameError.textContent = "";
  lNameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  const data = Object.fromEntries(new FormData(e.target));
  const errors = {};

  const fName = data.f_name.trim();

  if (!fName) {
    errors.f_name = "First Name cannot be empty";
    fNameInput.classList.add("input-error");
    document.querySelector("#f_name + .icon-error").style.display = "block";
  } else if (!/^[a-zA-Z\s'-]+$/.test(fName)) {
    errors.f_name = "Name contains special characters which are not allowed";
    fNameInput.classList.add("input-error");
    document.querySelector("#f_name + .icon-error").style.display = "block";
  }

  const lName = data.l_name.trim();

  if (!lName) {
    errors.l_name = "Last Name cannot be empty";
    lNameInput.classList.add("input-error");
    document.querySelector("#l_name + .icon-error").style.display = "block";
  } else if (!/^[a-zA-Z\s'-]+$/.test(lName)) {
    errors.l_name = "Name contains special character which are not allowed";
    lNameInput.classList.add("input-error");
    document.querySelector("#l_name + .icon-error").style.display = "block";
  }

  const email = data.email.trim();

  if (!email) {
    errors.email = "Looks like this is not an email";
    emailInput.classList.add("input-error");
    document.querySelector("#email + .icon-error").style.display = "block";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Looks like this is not an email";
    emailInput.classList.add("input-error");
    document.querySelector("#email + .icon-error").style.display = "block";
  }

  const password = data.password.trim();

  if (!password) {
    errors.password = "Password cannot be empty";
    passwordInput.classList.add("input-error");
    document.querySelector("#password + .icon-error").style.display = "block";
  } else if (password.length < 4) {
    errors.password = "Password must be at least 4 characters";
    passwordInput.classList.add("input-error");
    document.querySelector("#password + .icon-error").style.display = "block";
  }

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
  } else {
    console.log("Form is Valid!", data);
  }

  function displayErrors(errors) {
    for (const key in errors) {
      const errorElement = document.getElementById(`${key}-error`);
      if (errorElement) {
        errorElement.textContent = errors[key];
      }
    }
  }
};

form.addEventListener("submit", handleSubmit);
