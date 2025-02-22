import React, { useState } from "react";
import "./FormPage.css";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
  });

  const skillsOptions = [
    "Frontend",
    "Backend",
    "AI/ML",
    "Cybersecurity",
    "UI/UX Design",
    "Mobile Development",
    "Data Science",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // Redirect to the Matching Page
    navigate("/matching");
  };

  return (
    <div className="form-container">
      <h1>Sign Up for CodeSwitch</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email Input */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Skills Checkboxes */}
        <fieldset>
          <legend>What skills do you have?</legend>
          <div className="skills-container">
            {skillsOptions.map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
