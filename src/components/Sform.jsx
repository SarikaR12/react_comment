import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [studentName, setStudentName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);

  // Load initial data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("studentData"));
    if (savedData) {
      setStudentName(savedData.studentName || "");
      setCity(savedData.city || "");
      setGender(savedData.gender || "");
      setHobbies(savedData.hobbies || []);
    }
  }, []);

  const handleCheckboxChange = (hobby) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = {
      studentName,
      city,
      gender,
      hobbies,
    };

    // Save to localStorage
    localStorage.setItem("studentData", JSON.stringify(studentData));

    alert("Data saved to localStorage!");
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select City</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label>Hobbies:</label>
          <div>
            <input
              type="checkbox"
              id="reading"
              value="Reading"
              checked={hobbies.includes("Reading")}
              onChange={() => handleCheckboxChange("Reading")}
            />
            <label htmlFor="reading">Reading</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="traveling"
              value="Traveling"
              checked={hobbies.includes("Traveling")}
              onChange={() => handleCheckboxChange("Traveling")}
            />
            <label htmlFor="traveling">Traveling</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="sports"
              value="Sports"
              checked={hobbies.includes("Sports")}
              onChange={() => handleCheckboxChange("Sports")}
            />
            <label htmlFor="sports">Sports</label>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StudentForm;
