const token = localStorage.getItem("token");
if (!token && window.location.pathname.includes("main.html")) {
  window.location.href = "login.html";
}

const selects = document.querySelectorAll(".subject-select");

function updateSelectOptions() {
  const selectedValues = Array.from(selects).map(s => s.value);

  selects.forEach(select => {
    Array.from(select.options).forEach(option => {
      option.disabled = option.value && selectedValues.includes(option.value) && option.value !== select.value;
    });
  });
}

selects.forEach(select => select.addEventListener("change", updateSelectOptions));
updateSelectOptions();

// ====== Registration ======
async function handleRegister(e) {
  e.preventDefault();

  const registerEmail = document.querySelector("#registerEmail");
  const registerPassword = document.querySelector("#registerPassword");

  const body = {
    email: registerEmail.value,
    password: registerPassword.value,
  };

  const registerResponse = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (registerResponse.ok) {
    alert("Registration successful!");

    // Transferring data to the login form, and for some reason it doesn't work
    document.querySelector("#loginEmail").value = registerEmail.value;
    document.querySelector("#loginPassword").value = registerPassword.value;

    document.querySelector("#loginSection").scrollIntoView({ behavior: "smooth" });
  } else {
    const err = await registerResponse.json();
    alert("Ошибка регистрации: " + err.message);
  }
}

document.querySelector("#registerForm")?.addEventListener("submit", handleRegister);

// ====== Checking scores ======
document.getElementById("scoreForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    subject1: this.subject1.value,
    score1: parseInt(this.score1.value, 10),
    subject2: this.subject2.value,
    score2: parseInt(this.score2.value, 10),
    subject3: this.subject3.value,
    score3: parseInt(this.score3.value, 10),
  };

  try {
    const res = await fetch("/api/check-scores", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`//!!!
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    displayResults(json);
  } catch (err) {
    document.getElementById("result").textContent = "Network error.";
  }
});

function displayResults(json) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const { enteredScores, matchingPrograms } = json;
  if (!matchingPrograms || matchingPrograms.length === 0) {
    container.innerHTML = `<p class="no-pass">Sorry, you did not pass anywhere.</p>`;
    return;
  }

  // blocks for budget and fellowship
  const budgetPrograms = matchingPrograms.filter(p => enteredScores.total >= p.free_threshold);
  const scholarshipPrograms = matchingPrograms.filter(p => enteredScores.total >= p.scholarship_threshold);

  if (budgetPrograms.length > 0) {
    const budgetBlock = document.createElement("div");
    budgetBlock.classList.add("program-block", "budget");
    budgetBlock.innerHTML = `<h3>You passed for budget:</h3>` + budgetPrograms.map(p => `
      <div class="program-card">
        <h4>${p.program}</h4>
        <p>${p.university}</p>
        <p>Free threshold: ${p.free_threshold}</p>
        <p>Scholarship threshold: ${p.scholarship_threshold}</p>
      </div>
    `).join("");
    container.appendChild(budgetBlock);
  }

  if (scholarshipPrograms.length > 0) {
    const scholarshipBlock = document.createElement("div");
    scholarshipBlock.classList.add("program-block", "scholarship");
    scholarshipBlock.innerHTML = `<h3>You passed for scholarship:</h3>` + scholarshipPrograms.map(p => `
      <div class="program-card">
        <h4>${p.program}</h4>
        <p>${p.university}</p>
        <p>Free threshold: ${p.free_threshold}</p>
        <p>Scholarship threshold: ${p.scholarship_threshold}</p>
      </div>
    `).join("");
    container.appendChild(scholarshipBlock);
  }
}
