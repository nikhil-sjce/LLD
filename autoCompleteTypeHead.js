//in Vanilla Js

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla TypeAhead with Debounce</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="search-container">
    <input
      id="searchInput"
      type="text"
      placeholder="Search..."
      oninput="handleInput()"
      autocomplete="off"
    />
    <ul id="suggestions"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>


// Mock dataset (in place of real API)
const countries = [
  "India",
  "Indonesia",
  "Canada",
  "China",
  "United States",
  "United Kingdom",
  "Australia",
  "Austria",
  "Argentina",
  "Ireland"
];

// Mock "fetch" that returns filtered data after a short delay
function fetchCountriesMock(searchTerm) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filtered);
    }, 300); // simulate network delay
  });
}

// Debounce function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function performSearch() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const suggestionsEl = document.getElementById("suggestions");

  if (!searchInput) {
    suggestionsEl.innerHTML = "";
    return;
  }

  try {
    const results = await fetchCountriesMock(searchInput);
    suggestionsEl.innerHTML = "";
    results.forEach(result => {
      const li = document.createElement("li");
      li.textContent = result;
      suggestionsEl.appendChild(li);

      li.onclick = () => {
        document.getElementById("searchInput").value = result;
        suggestionsEl.innerHTML = "";
      };
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}

// Attach debounced search
const debouncedSearch = debounce(performSearch, 500);

function handleInput() {
  debouncedSearch();
}


// React.js

// Mock dataset (in place of real API)
const countries = [
  "India",
  "Indonesia",
  "Canada",
  "China",
  "United States",
  "United Kingdom",
  "Australia",
  "Austria",
  "Argentina",
  "Ireland"
];

// Mock "fetch" that returns filtered data after a short delay
function fetchCountriesMock(searchTerm) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filtered);
    }, 300); // simulate network delay
  });
}

// Debounce function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function performSearch() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const suggestionsEl = document.getElementById("suggestions");

  if (!searchInput) {
    suggestionsEl.innerHTML = "";
    return;
  }

  try {
    const results = await fetchCountriesMock(searchInput);
    suggestionsEl.innerHTML = "";
    results.forEach(result => {
      const li = document.createElement("li");
      li.textContent = result;
      suggestionsEl.appendChild(li);

      li.onclick = () => {
        document.getElementById("searchInput").value = result;
        suggestionsEl.innerHTML = "";
      };
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}

// Attach debounced search
const debouncedSearch = debounce(performSearch, 500);

function handleInput() {
  debouncedSearch();
}
