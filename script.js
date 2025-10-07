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

  // === Save Request & Send Form ===
  form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop the browser for a moment

    const request = {
      name: document.getElementById("fullName")?.value || "",
      email: document.getElementById("email")?.value || "",
      grade: document.getElementById("grade")?.value || "",
      subject: document.getElementById("subject")?.value || "",
      pages: document.getElementById("pages")?.value || "",
      type: document.getElementById("summaryType")?.value || "",
      date: document.getElementById("dueDate")?.value || "",
      price: document.getElementById("price")?.value || ""
    };

    // Save to localStorage
    let requests = JSON.parse(localStorage.getItem("learnlabRequests")) || [];
    requests.push(request);
    localStorage.setItem("learnlabRequests", JSON.stringify(requests));

    alert("Your LearnLab request has been saved and sent!");

    // Now submit form to FormSubmit
    e.target.submit();
  });
});
