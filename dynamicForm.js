// Vanilla JS

<!DOCTYPE html>
<html>
  <head>
    <title>Dynamic Form</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <h2>Dynamic Form</h2>

    <form id="dynamicForm"></form>

    <button id="submitBtn" type="button">Submit</button>

    <script src="script.js"></script>
  </body>
</html>

//css
form {
  max-width: 300px;
}

input, select {
  width: 100%;
  padding: 6px;
  margin: 8px 0;
}

.error {
  color: red;
  font-size: 12px;
}

//js

const formConfig = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: false },
  { name: "country", label: "Country", type: "select", required: true, options: ["India", "USA", "UK"] }
];

const form = document.getElementById("dynamicForm");

// ---------- Render Form ----------
formConfig.forEach(field => {
  const label = document.createElement("label");
  label.innerText = field.label;

  let input;

  if (field.type === "select") {
    input = document.createElement("select");
    field.options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      input.appendChild(option);
    });
  } else {
    input = document.createElement("input");
    input.type = field.type;
  }

  input.id = field.name;
  input.name = field.name;
  input.required = field.required;

  const error = document.createElement("div");
  error.className = "error";
  error.id = `${field.name}-error`;

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(error);
});

// ---------- Basic Validation ----------
document.getElementById("submitBtn").addEventListener("click", () => {
  let isValid = true;

  formConfig.forEach(field => {
    const value = document.getElementById(field.name).value.trim();
    const err = document.getElementById(`${field.name}-error`);

    if (field.required && !value) {
      err.textContent = `${field.label} is required`;
      isValid = false;
    } else {
      err.textContent = "";
    }
  });

  if (isValid) {
    alert("Form submitted successfully!");
  }
});


// React 

import { useState } from "react";

const formConfig = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: false },
  { name: "country", label: "Country", type: "select", required: true, options: ["India", "USA", "UK"] }
];

export default function DynamicForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};

    formConfig.forEach(f => {
      if (f.required && !formData[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted!");
    }
  };

  return (
    <div>
      <h2>Dynamic Form</h2>

      {formConfig.map(field => (
        <div key={field.name} style={{ marginBottom: "12px" }}>
          <label>{field.label}</label>

          {field.type === "select" ? (
            <select onChange={(e) => handleChange(field.name, e.target.value)}>
              <option value="">Select</option>
              {field.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {errors[field.name] && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}




