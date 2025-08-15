// this getss the form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// this is the error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// this is the onChange event listeners
nameInput.addEventListener('change', validateName);
emailInput.addEventListener('change', validateEmail);
phoneInput.addEventListener('change', validatePhone);
passwordInput.addEventListener('change', validatePassword);
confirmPasswordInput.addEventListener('change', validateConfirmPassword);

// this is the validation functions
function validateName() {
    const name = nameInput.value.trim();
    
    if (name.length < 5) {
        showError(nameInput, nameError, 'Hero name must be at least 5 characters long');
        return false;
    }
    
    showSuccess(nameInput, nameError);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    
    if (!email.includes('@')) {
        showError(emailInput, emailError, 'Email must contain an @ symbol');
        return false;
    }
    
    showSuccess(emailInput, emailError);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    
    if (!phoneRegex.test(phone)) {
        showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits');
        return false;
    }
    
    if (phone === '1234567890') {
        showError(phoneInput, phoneError, 'Phone number cannot be 1234567890');
        return false;
    }
    
    showSuccess(phoneInput, phoneError);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const name = nameInput.value.trim().toLowerCase();
    
    if (password.length < 8) {
        showError(passwordInput, passwordError, 'Secret code must be at least 8 characters long');
        return false;
    }
    
    if (password.toLowerCase() === 'password') {
        showError(passwordInput, passwordError, 'Secret code cannot be "password"');
        return false;
    }
    
    if (name && password.toLowerCase() === name) {
        showError(passwordInput, passwordError, 'Secret code cannot match your hero name');
        return false;
    }
    
    showSuccess(passwordInput, passwordError);
    
    // this re-validate confirm password if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }
    
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Secret codes do not match');
        return false;
    }
    
    showSuccess(confirmPasswordInput, confirmPasswordError);
    return true;
}

function showError(input, errorElement, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showSuccess(input, errorElement) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    errorElement.classList.remove('show');
}

function validateForm(event) {
    event.preventDefault();
    
    // this is to run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // this checks if all validations pass
    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid;
    
    if (isFormValid) {
        // Form is valid - it shows Spider-Man themed message
        alert('Welcome to the Spider-Verse! Your registration was successful! 🕷️');
        window.location.reload();
    } else {
        // Focus on the first invalid field
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isPhoneValid) phoneInput.focus();
        else if (!isPasswordValid) passwordInput.focus();
        else if (!isConfirmPasswordValid) confirmPasswordInput.focus();
    }
}