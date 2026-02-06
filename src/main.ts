import "./style.css";

function setupEmailCopy(): void {
  const emailButton = document.querySelector<HTMLButtonElement>("#email-button");
  if (!emailButton) return;

  const email = emailButton.dataset.email;
  if (!email) return;

  const label = emailButton.querySelector<HTMLSpanElement>("span");
  if (!label) return;

  emailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Copied!";
      emailButton.classList.add("copied");

      setTimeout(() => {
        label.textContent = "Email";
        emailButton.classList.remove("copied");
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      label.textContent = "Copied!";
      emailButton.classList.add("copied");

      setTimeout(() => {
        label.textContent = "Email";
        emailButton.classList.remove("copied");
      }, 2000);
    }
  });
}

function animateOnLoad(): void {
  const card = document.querySelector<HTMLDivElement>(".card");
  const linkButtons = document.querySelectorAll<HTMLElement>(".link-button");

  if (!card) return;

  // Animate card in
  requestAnimationFrame(() => {
    card.classList.add("visible");
  });

  // Stagger link animations
  linkButtons.forEach((button, index) => {
    const delay = 300 + index * 120;
    setTimeout(() => {
      button.classList.add("visible");
    }, delay);
  });

  // Set up email copy-to-clipboard
  setupEmailCopy();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateOnLoad);
} else {
  animateOnLoad();
}
