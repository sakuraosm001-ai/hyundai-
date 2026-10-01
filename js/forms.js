function validateForm(form) {
  const inputs = form.querySelectorAll('input[required]');
  let valid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();
    const isEmpty = !value;

    if (isEmpty) {
      valid = false;
      input.classList.add('input-error');
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Это поле обязательно для заполнения.';
        input.insertAdjacentElement('afterend', error);
      }
      return;
    }

    input.classList.remove('input-error');
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
      existingError.remove();
    }

    if (input.type === 'tel' && !/^[+()\d\s-]+$/.test(value)) {
      valid = false;
      input.classList.add('input-error');
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Введите корректный номер телефона.';
        input.insertAdjacentElement('afterend', error);
      }
    }
  });

  return valid;
}

function collectFormData(form) {
  const data = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach((field) => {
    if (field.name) {
      data[field.name] = field.value.trim();
    }
  });
  return data;
}

function attachFormSubmitHandlers() {
  document.querySelectorAll('.js-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isValid = validateForm(form);
      if (!isValid) return;

      const formType = form.dataset.formType || 'consultation';
      const payload = collectFormData(form);

      if (typeof window !== 'undefined') {
        const utmData = JSON.parse(localStorage.getItem('hyundai_utm') || '{}');
        Object.assign(payload, utmData);
      }

      if (typeof window !== 'undefined' && typeof window.trackAnalyticsEvent === 'function') {
        window.trackAnalyticsEvent(formType);
      }

      window.location.href = 'thank-you.html';
    });
  });
}

document.addEventListener('DOMContentLoaded', attachFormSubmitHandlers);

