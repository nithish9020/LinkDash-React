import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './EditDes.css';
import { toast } from 'react-toastify';

const EditDes = () => {
  const [name, setName] = useState("Nithsih");
  const [Role, setRole] = useState("Student");
  const [description, setDes] = useState("If you need to perform different actions based on the value of the input or customize the routing path, you can adjust the handleKeyDown function accordingly. For instance, if you want to navigate to a route that includes a query parameter or based on selected value, you can modify the logic within handleKeyDown.");
  const [skills, setSkills] = useState(["Java", "C++", "Python"]);
  const [newSkill, setNewSkill] = useState("");

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };

  const handleAddSkill = (event) => {
    if (event.key === 'Enter' && newSkill.trim() !== '') {
      if (skills.length < 8) {
        if (!skills.includes(newSkill)) {
          setSkills((prevSkills) => [...prevSkills, newSkill]);
          setNewSkill(''); // Clear the input after adding
        } else {
          toast.error("Skill already exists!", { position: "bottom-right" });
        }
      } else {
        toast.error("Maximum Skill Limit reached!", { position: "bottom-right" });
      }
    }
  };

  return (
    <div className='EditDes-container'>
      <div>
        <p className='Heading'>Edit Description</p> 
      </div>
      <div className='input-box-container'>
        <div className='Flex-box'>
          <TextField
            id="name-box"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Controlled input for Name
            variant="standard"
            sx={{ width: 500 }}
          />
          <TextField
            id="role-box"
            label="Role"
            value={Role}
            onChange={(e) => setRole(e.target.value)}  // Controlled input for Role
            variant="standard"
            sx={{ width: 500 }}
          />
        </div>
        <div style={{width:"82%"}}>
          <TextField
            id="description-multiline"
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDes(e.target.value)}  // Controlled input for Description
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <div className='Skill-container input-box-container'>
        <p className='Heading'>Skills</p>
        <TextField
          id="skill-add"
          label="Add Skill"
          variant="standard"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
          sx={{ width: 500 }}
          onKeyDown={handleAddSkill}  // Handle adding new skill on Enter
        />
        <div className='skill-button-container'>
          {skills.map((skill) => (
            <button 
              key={skill} 
              className="skill-button"
              onClick={() => handleRemoveSkill(skill)}  // Handle skill removal
            >
              {skill}  ✖
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className='desu-but'>
          Update Description
        </button>
      </div>
    </div>
  );
}

export default EditDes;
