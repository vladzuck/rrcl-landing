(() => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Inquiry form: submits to Web3Forms, which emails the submission to
  // the company inbox tied to the access_key in the hidden field below.
  const form = document.getElementById('inquiryForm');
  const formPanel = document.getElementById('formPanel');
  const confirmPanel = document.getElementById('confirmPanel');
  const submitBtn = form.querySelector('button[type="submit"]');

  let formError = document.createElement('p');
  formError.className = 'form-note';
  formError.style.color = '#b3261e';
  formError.hidden = true;
  form.querySelector('.form-note').after(formError);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    formError.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const result = await response.json();

      if (result.success) {
        formPanel.hidden = true;
        confirmPanel.hidden = false;
        confirmPanel.focus();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      formError.hidden = false;
      formError.textContent = 'Something went wrong sending your message — please try again, or email us directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send inquiry';
    }
  });
})();
