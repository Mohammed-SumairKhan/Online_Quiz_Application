// Get form elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Get error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Password requirement elements
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqLower = document.getElementById('req-lower');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// ------------------ Password Validation ------------------
passwordInput.addEventListener('input', function() {
    const password = this.value;

    // Length
    updateRequirement(reqLength, password.length >= 6);
    // Uppercase
    updateRequirement(reqUpper, /[A-Z]/.test(password));
    // Lowercase
    updateRequirement(reqLower, /[a-z]/.test(password));
    // Number
    updateRequirement(reqNumber, /[0-9]/.test(password));
    // Special character
    updateRequirement(reqSpecial, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password));
});

function updateRequirement(element, condition) {
    if (condition) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        element.querySelector('.icon').textContent = '✓';
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        element.querySelector('.icon').textContent = '✗';
    }
}

// ------------------ Helper Functions ------------------
function validatePassword(password) {
    return password.length >= 6 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ------------------ Real-time validation ------------------
emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (this.value && passwordInput.value !== this.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
    } else {
        confirmPasswordError.textContent = '';
    }
});

// ------------------ Form Submission ------------------
signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default to validate first

    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    let isValid = true;

    // Name validation
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }

    // Email validation
    if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Password validation
    if (!validatePassword(passwordInput.value)) {
        passwordError.textContent = 'Password does not meet requirements';
        isValid = false;
    }

    // Confirm password
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        isValid = false;
    }

    // If all validations pass, submit to servlet
    if (isValid) {
        signupForm.submit(); // This will send data to /signup (SignupServlet)
    }
});
