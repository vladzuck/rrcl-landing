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

  // Inquiry form: client-side validation + confirmation state.
  // TODO: wire this up to a real submission endpoint (e.g. Formspree,
  // Netlify Forms, or a serverless function forwarding to the RRCL
  // Office 365 mailbox) once that mailbox is provisioned — right now
  // submitting only shows the confirmation panel, it does not send mail.
  const form = document.getElementById('inquiryForm');
  const formPanel = document.getElementById('formPanel');
  const confirmPanel = document.getElementById('confirmPanel');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    formPanel.hidden = true;
    confirmPanel.hidden = false;
    confirmPanel.focus();
  });
})();
