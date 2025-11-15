// =============================
// LOGIN PAGE SCRIPT (CLEANED)
// =============================

// Form Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const loginButton = loginForm.querySelector('.btn-login');

// Floating Label Effect
document.querySelectorAll('.input-group input').forEach(input => {
    
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password Validation
function isValidPassword(password) {
    return password.length >= 6;
}

// Real-Time Validation Border Color
function validateInputBorder(input, isValid) {
    input.style.borderColor = isValid ? '#e5e7eb' : '#ef4444';
}

emailInput.addEventListener('input', () => {
    validateInputBorder(emailInput, !emailInput.value || isValidEmail(emailInput.value));
});

passwordInput.addEventListener('input', () => {
    validateInputBorder(passwordInput, !passwordInput.value || isValidPassword(passwordInput.value));
});

// Show Error Message
function showError(input, message) {
    validateInputBorder(input, false);
    input.focus();

    let msg = input.parentElement.querySelector('.error-message');
    if (!msg) {
        msg = document.createElement('span');
        msg.className = 'error-message';
        msg.style.cssText = 'color:#ef4444;font-size:12px;margin-top:4px;display:block;';
        input.parentElement.appendChild(msg);
    }
    msg.textContent = message;

    setTimeout(() => msg.remove(), 2500);
}

// Success Toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="
            position:fixed;top:20px;right:20px;padding:14px 20px;
            background:#10b981;color:white;border-radius:10px;
            box-shadow:0 10px 25px rgba(0,0,0,0.15);
            font-size:14px;z-index:9999;opacity:0;transform:translateX(50px);
            transition:all 0.3s ease;">
            ${message}
        </div>
    `;

    document.body.appendChild(toast);
    const msg = toast.firstElementChild;

    // Slide In
    setTimeout(() => {
        msg.style.opacity = '1';
        msg.style.transform = 'translateX(0)';
    }, 20);

    // Slide Out
    setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateX(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!isValidEmail(email)) {
        showError(emailInput, "Enter a valid email");
        return;
    }

    if (!isValidPassword(password)) {
        showError(passwordInput, "Password must be at least 6 characters");
        return;
    }

    // Show loading
    loginButton.classList.add('loading');

    setTimeout(() => {
        loginButton.classList.remove('loading');
        showToast("Logged in successfully!");

        loginForm.reset();
        document.querySelectorAll('.focused').forEach(e => e.classList.remove('focused'));

    }, 1500);
});

// Forgot Password
document.querySelector('.forgot-password')
    .addEventListener('click', e => {
        e.preventDefault();
        alert("Password reset feature coming soon!");
    });

// Signup Link
document.querySelector('.signup-link a')
    .addEventListener('click', e => {
        e.preventDefault();
        alert("Signup page coming soon!");
    });

// Social Buttons (simple click animation)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = 'scale(1)', 150);
    });
});
