const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function estimateParking(days, goldCard = false) {
  let total = 0;

  for (let day = 1; day <= days; day += 1) {
    if (day === 1) {
      total += 18;
    } else if (day <= 7) {
      total += 15;
    } else {
      total += 12;
    }
  }

  if (goldCard) {
    total *= 0.9;
  }

  return total;
}

const daysInput = document.querySelector("#days");
const goldCardInput = document.querySelector("#goldCard");
const estimateTotal = document.querySelector("#estimateTotal");

function updateEstimate() {
  const days = Math.max(1, Number(daysInput.value || 1));
  const goldCard = Boolean(goldCardInput.checked);
  const total = estimateParking(days, goldCard);

  estimateTotal.textContent = total.toLocaleString("en-NZ", {
    style: "currency",
    currency: "NZD",
  });
}

daysInput?.addEventListener("input", updateEstimate);
goldCardInput?.addEventListener("change", updateEstimate);
updateEstimate();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 600);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach((item) => {
  const summary = item.querySelector("summary");

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const isOpen = item.hasAttribute("open");

    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.hasAttribute("open")) {
        closeFaq(otherItem);
      }
    });

    if (isOpen) {
      closeFaq(item);
    } else {
      openFaq(item);
    }
  });
});

function openFaq(item) {
  item.setAttribute("open", "");
  requestAnimationFrame(() => {
    item.classList.add("is-open");
  });
}

function closeFaq(item) {
  item.classList.add("is-closing");
  item.classList.remove("is-open");

  setTimeout(() => {
    item.removeAttribute("open");
    item.classList.remove("is-closing");
  }, 450);
}
