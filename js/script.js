/* ============================================
   MELVIN GADGETS - Main JavaScript
   Theme toggle + form validation + interactions
   ============================================ */

// ---------- Dark / Light Mode ----------
(function initTheme() {
  const savedTheme = localStorage.getItem('mg-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('mg-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('mg-theme', 'dark');
  }
}

// ---------- Mobile Menu Toggle ----------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// ---------- Contact Form Validation ----------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('formSuccess');

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateField(input) {
    const value = input.value.trim();
    let isValid = true;

    clearError(input);

    if (input === nameInput) {
      if (value === '') {
        showError(input, 'Full name is required.');
        isValid = false;
      } else if (value.length < 2) {
        showError(input, 'Name must be at least 2 characters.');
        isValid = false;
      }
    }

    if (input === emailInput) {
      if (value === '') {
        showError(input, 'Email address is required.');
        isValid = false;
      } else if (!isValidEmail(value)) {
        showError(input, 'Please enter a valid email address.');
        isValid = false;
      }
    }

    if (input === subjectInput) {
      if (value === '') {
        showError(input, 'Subject is required.');
        isValid = false;
      } else if (value.length < 3) {
        showError(input, 'Subject must be at least 3 characters.');
        isValid = false;
      }
    }

    if (input === messageInput) {
      if (value === '') {
        showError(input, 'Message is required.');
        isValid = false;
      } else if (value.length < 10) {
        showError(input, 'Message must be at least 10 characters.');
        isValid = false;
      }
    }

    return isValid;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });

      input.addEventListener('input', function () {
        if (input.parentElement.classList.contains('error')) {
          validateField(input);
        }
      });
    }
  });

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (successMsg) {
      successMsg.classList.remove('show');
    }

    const nameValid = validateField(nameInput);
    const emailValid = validateField(emailInput);
    const subjectValid = validateField(subjectInput);
    const messageValid = validateField(messageInput);

    if (nameValid && emailValid && subjectValid && messageValid) {
      if (successMsg) {
        successMsg.textContent =
          'Thank you, ' +
          nameInput.value.trim().split(' ')[0] +
          '! Your message has been received. We will get back to you soon.';
        successMsg.classList.add('show');
      }

      contactForm.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(clearError);
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ---------- Time-based Greeting ----------
function setTimeGreeting() {
  const greetingEl = document.getElementById('timeGreeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greeting = 'Welcome';

  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  greetingEl.textContent = greeting;
}

// ---------- Init on DOM ready ----------
document.addEventListener('DOMContentLoaded', function () {
  setTimeGreeting();

  // Theme toggle button
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
