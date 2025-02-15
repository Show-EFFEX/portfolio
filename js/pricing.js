/*
      planData for each service type.
      Each service has 3 packages: basic, pro, enterprise.
      Each package has:
        - price
        - description
        - 5 checked features (checks)
        - 3 crossed features (crosses)
    */
const planData = {
  "Long Form Videos": {
    basic: {
      price: 50,
      description: "Basic editing for longer content",
      checks: [
        "Up to 30 min video",
        "Basic cuts & transitions",
        "720p Output",
        "1 Revision",
        "Basic color tweaks",
      ],
      crosses: ["Advanced effects", "Motion graphics", "Dedicated manager"],
    },
    pro: {
      price: 120,
      description: "Advanced editing for longer content",
      checks: [
        "Up to 60 min video",
        "Color grading",
        "1080p Output",
        "2 Revisions",
        "4K Rendering",
        "Motion graphics",
      ],
      crosses: ["On-call support", "Social media promotion"],
    },
    enterprise: {
      price: 300,
      description: "Full-scale production for long content",
      checks: [
        "Unlimited length",
        "Dedicated manager",
        "4K Rendering",
        "Priority support",
        "3 Revisions",
      ],
      crosses: ["Offline events", "Bulk discount", "Multi-channel editing"],
    },
  },

  "Short Form Videos": {
    basic: {
      price: 30,
      description: "Basic editing for short clips",
      checks: [
        "Up to 5 min video",
        "Basic cuts",
        "720p Output",
        "1 Revision",
        "Basic text overlays",
      ],
      crosses: ["Advanced transitions", "Motion graphics", "Color grading"],
    },
    pro: {
      price: 80,
      description: "Pro editing for short content",
      checks: [
        "Up to 15 min video",
        "1080p Output",
        "2 Revisions",
        "Motion graphics",
        "Color grading",
      ],
      crosses: ["4K Rendering", "Priority support", "Dedicated manager"],
    },
    enterprise: {
      price: 200,
      description: "Enterprise solution for short content",
      checks: [
        "Up to 30 min video",
        "4K Rendering",
        "3 Revisions",
        "Dedicated manager",
        "Priority support",
      ],
      crosses: ["Bulk discount", "Offline events", "Multi-channel editing"],
    },
  },

  "Thumbnail Design": {
    basic: {
      price: 15,
      description: "Basic thumbnail design",
      checks: [
        "1 thumbnail",
        "Stock images",
        "Basic text & graphics",
        "1 Revision",
        "Fast delivery",
      ],
      crosses: [
        "Custom illustration",
        "Advanced branding",
        "Dedicated designer",
      ],
    },
    pro: {
      price: 60,
      description: "Pro thumbnail package",
      checks: [
        "5 thumbnails",
        "Custom fonts",
        "Color grading",
        "Advanced graphics",
        "2 Revisions",
      ],
      crosses: ["Hand-drawn artwork", "Bulk discount", "On-call support"],
    },
    enterprise: {
      price: 120,
      description: "Enterprise thumbnail solution",
      checks: [
        "Unlimited thumbnails",
        "Dedicated designer",
        "Branding consultation",
        "Priority support",
        "3 Revisions",
      ],
      crosses: ["Offline events", "Bulk discount", "Social media management"],
    },
  },

  "Channel & Social Media Manager": {
    basic: {
      price: 70,
      description: "Basic channel management",
      checks: [
        "Weekly uploads",
        "Basic SEO",
        "Thumbnail design",
        "Community replies",
        "Monthly report",
      ],
      crosses: ["Advanced SEO", "Paid advertising", "Daily content strategy"],
    },
    pro: {
      price: 150,
      description: "Pro channel & social management",
      checks: [
        "Bi-weekly uploads",
        "Advanced SEO",
        "Social media posting",
        "Community engagement",
        "Monthly analysis",
      ],
      crosses: [
        "Paid ads management",
        "Influencer outreach",
        "Custom branding",
      ],
    },
    enterprise: {
      price: 300,
      description: "Full-scale channel & social solution",
      checks: [
        "Daily content strategy",
        "Priority support",
        "Paid advertising",
        "Dedicated manager",
        "Detailed analytics",
      ],
      crosses: ["Bulk discount", "Offline events", "In-person consulting"],
    },
  },
};

// TOGGLE REFERENCES
const toggleOptions = document.querySelectorAll(".toggle-option");

// PRICING CARD REFERENCES
const basicCard = document.querySelector('[data-plan="basic"]');
const proCard = document.querySelector('[data-plan="pro"]');
const enterpriseCard = document.querySelector('[data-plan="enterprise"]');

// Price elements
const basicPriceEl = basicCard.querySelector(".pricing-price");
const proPriceEl = proCard.querySelector(".pricing-price");
const enterprisePriceEl = enterpriseCard.querySelector(".pricing-price");

// Description elements
const basicDescEl = basicCard.querySelector(".plan-desc");
const proDescEl = proCard.querySelector(".plan-desc");
const enterpriseDescEl = enterpriseCard.querySelector(".plan-desc");

// Feature lists
const basicFeaturesEl = basicCard.querySelector('[data-features="basic"]');
const proFeaturesEl = proCard.querySelector('[data-features="pro"]');
const enterpriseFeaturesEl = enterpriseCard.querySelector(
  '[data-features="enterprise"]'
);

// Fill feature lists
function fillFeatures(listEl, checks, crosses) {
  listEl.innerHTML = "";
  checks.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("checked");
    listEl.appendChild(li);
  });
  crosses.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("crossed");
    listEl.appendChild(li);
  });
}

// Switch service category
function showServiceCategory(category) {
  // Update active button
  toggleOptions.forEach((opt) => {
    opt.classList.remove("active");
    if (opt.dataset.service === category) {
      opt.classList.add("active");
    }
  });

  const catData = planData[category];

  // BASIC
  basicPriceEl.innerHTML = `$${catData.basic.price}<span>/ project</span>`;
  basicDescEl.textContent = catData.basic.description;
  fillFeatures(basicFeaturesEl, catData.basic.checks, catData.basic.crosses);

  // PRO
  proPriceEl.innerHTML = `$${catData.pro.price}<span>/ project</span>`;
  proDescEl.textContent = catData.pro.description;
  fillFeatures(proFeaturesEl, catData.pro.checks, catData.pro.crosses);

  // ENTERPRISE
  enterprisePriceEl.innerHTML = `$${catData.enterprise.price}<span>/ project</span>`;
  enterpriseDescEl.textContent = catData.enterprise.description;
  fillFeatures(
    enterpriseFeaturesEl,
    catData.enterprise.checks,
    catData.enterprise.crosses
  );
}

// Event: Click on toggle option
toggleOptions.forEach((opt) => {
  opt.addEventListener("click", () => {
    showServiceCategory(opt.dataset.service);
  });
});

// Show "Long Form Videos" by default
document.addEventListener("DOMContentLoaded", () => {
  showServiceCategory("Long Form Videos");
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    // Close others
    faqItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove("open");
      }
    });
    // Toggle this one
    item.classList.toggle("open");
  });
});
