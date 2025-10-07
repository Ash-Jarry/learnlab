document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("summaryForm");
  const pagesInput = document.getElementById("pages");
  const summaryType = document.getElementById("summaryType");
  const priceInput = document.getElementById("price");

  // === Auto Calculate Price ===
  function updatePrice() {
    const pages = parseInt(pagesInput.value) || 0;
    const type = summaryType.value;
    let price = "";

    if (type === "handwritten") {
      if (pages <= 10) price = "R160";
      else if (pages <= 20) price = "R190";
      else price = "R250";
    } else if (type === "typed") {
      if (pages <= 10) price = "R130";
      else if (pages <= 20) price = "R150";
      else price = "R210";
    }

    priceInput.value = price;
  }

  pagesInput.addEventListener("input", updatePrice);
  summaryType.addEventListener("change", updatePrice);

  // === Send to Google Sheet ===
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      grade: document.getElementById("grade").value,
      subject: document.getElementById("subject").value,
      pages: document.getElementById("pages").value,
      summaryType: document.getElementById("summaryType").value,
      dueDate: document.getElementById("dueDate").value,
      price: document.getElementById("price").value
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyfdb6dIuLXqD3wqCNZKb-hT4udQBo9a1LVJZeUscXkDCeX0m8s5Jq8wQtaYur-Qajs/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      });
      alert("✅ Your LearnLab request was submitted successfully!");
      form.reset();
    } catch (err) {
      console.error("Error submitting:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  });
});

