// Vanilla HTML, CSS, JS

<!DOCTYPE html>
<html>
<head>
  <title>Job History</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h2>Flow Jobs</h2>

  <div class="filters">
    <input type="text" id="searchInput" placeholder="Search jobs..." />
    <select id="statusFilter">
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Failed">Failed</option>
      <option value="Running">Running</option>
    </select>
  </div>

  <table id="jobTable">
    <thead>
      <tr>
        <th>Job</th>
        <th>Status</th>
        <th>Flow</th>
        <th>User</th>
        <th>Started</th>
      </tr>
    </thead>
    <tbody id="jobBody"></tbody>
  </table>

  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.status-completed {
  color: green;
  font-weight: bold;
}

.status-failed {
  color: red;
  font-weight: bold;
}

.status-running {
  color: orange;
  font-weight: bold;
}


// ---- Mock API ----
const JOBS = [
  { id: "3618594", name: "Categories", flow: "2021 POS", user: "UserA", status: "Completed", startedAt: "2023-09-25" },
  { id: "3618544", name: "Categories", flow: "2021 POS", user: "UserB", status: "Completed", startedAt: "2023-09-24" },
  { id: "3618377", name: "Categories", flow: "2021 POS", user: "UserC", status: "Failed", startedAt: "2023-09-10" },
  { id: "3618310", name: "COVID Sample Run", flow: "SnowflakeExec", user: "UserA", status: "Running", startedAt: "2023-09-26" },
];

function fetchJobs() {
  return new Promise(resolve => {
    setTimeout(() => resolve(JOBS), 500);
  });
}

// ---- DOM Elements ----
const jobBody = document.getElementById("jobBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let allJobs = [];
let filteredJobs = [];

// ---- Render Function ----
function renderJobs(jobs) {
  jobBody.innerHTML = "";

  jobs.forEach(job => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${job.name} <br/><small>${job.id}</small></td>
      <td class="status-${job.status.toLowerCase()}">${job.status}</td>
      <td>${job.flow}</td>
      <td>${job.user}</td>
      <td>${job.startedAt}</td>
    `;
    jobBody.appendChild(row);
  });
}

// ---- Filtering ----
function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const status = statusFilter.value;

  filteredJobs = allJobs.filter(job => {
    const matchesSearch =
      job.name.toLowerCase().includes(query) ||
      job.id.includes(query);

    const matchesStatus = 
      status === "All" || job.status === status;

    return matchesSearch && matchesStatus;
  });

  renderJobs(filteredJobs);
}

// ---- Debounce ----
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ---- Event Listeners ----
searchInput.addEventListener("input", debounce(applyFilters));
statusFilter.addEventListener("change", applyFi.//lters);

// ---- Init ----
async function init() {
  allJobs = await fetchJobs();
  filteredJobs = allJobs;
  renderJobs(allJobs);
}

init();


// React

import { useEffect, useState, useMemo } from "react";

const MOCK_JOBS = [
  { id: "3618594", name: "Categories", flow: "2021 POS", user: "UserA", status: "Completed", startedAt: "2023-09-25" },
  { id: "3618377", name: "Categories", flow: "2021 POS", user: "UserC", status: "Failed", startedAt: "2023-09-10" },
  { id: "3618310", name: "COVID Sample Run", flow: "SnowflakeExec", user: "UserA", status: "Running", startedAt: "2023-09-26" },
];

export default function JobHistory() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    setTimeout(() => setJobs(MOCK_JOBS), 500);
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        job.name.toLowerCase().includes(search.toLowerCase()) ||
        job.id.includes(search);

      const matchesStatus =
        status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status, jobs]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Flow Jobs</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search jobs..."
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
          <option value="Running">Running</option>
        </select>
      </div>

      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Job</th>
            <th>Status</th>
            <th>Flow</th>
            <th>User</th>
            <th>Started</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(job => (
            <tr key={job.id}>
              <td>{job.name}<br/><small>{job.id}</small></td>
              <td style={{ color: job.status === "Completed" ? "green" : job.status === "Failed" ? "red" : "orange" }}>
                {job.status}
              </td>
              <td>{job.flow}</td>
              <td>{job.user}</td>
              <td>{job.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




