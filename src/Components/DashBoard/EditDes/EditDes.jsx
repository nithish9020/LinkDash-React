import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Config/Firebase';
import './EditDes.css';
import { userAuthDetails } from '../MainDash';
import { UserContext } from '../../../App';

const EditDes = ({ fetchData }) => {
  
  const userData = useContext(userAuthDetails); // Get user data from context
  const fetchUserId = useContext(UserContext)?.fetchUserId;

  const [name, setName] = useState(userData?.name || "");
  const [Role, setRole] = useState(userData?.Role || "");
  const [description, setDes] = useState(userData?.Description || "");
  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [userId, setUserId] = useState(userData?.userId || "");

  const userIdList = useContext(UserContext)?.idList?.map(userObject => userObject?.userId).filter(userid => userid !== userData?.userId);

  // Function to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };

  // Function to add a skill
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

  // Function to update the user description in Firestore
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'Description', userData?.email);

      // Update the document with the new data
      await updateDoc(docRef, {
        name: name,
        Role: Role,
        Description: description,
        skills: skills,
        userId: userId,
      });

      fetchUserId();

      toast.success("Description updated successfully!", {
        position: "bottom-right",
      });

      // Fetch the updated data after successful update
      fetchData();

    } catch (error) {
      toast.error("Error updating description: " + error.message, {
        position: "bottom-right",
      });
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="EditDes-container">
      <div>
        <p className="Heading">Edit Description</p>
      </div>
      <div className="input-box-container">
        <div className="Flex-box">
          <TextField
            id="user-id-box"
            label="User ID"
            value={userId}
            onChange={(e) => {
              const val = e.target.value;
              if (userIdList.includes(val)) {
                setUserId(val);
                toast.warning("UserId Unavailable!", { position: "top-center" });
                setTimeout(() => setUserId(''), 100);
              } else {
                setUserId(val);
              }
            }}
            variant="standard"
            sx={{ width: "30%" }}
          />
          <TextField
            id="name-box"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
            sx={{ width: "30%" }}
          />
          <TextField
            id="role-box"
            label="Role"
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            variant="standard"
            sx={{ width: "30%" }}
          />
        </div>
        <div style={{ width: "82%" }}>
          <TextField
            id="description-multiline"
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDes(e.target.value)}
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <div className="Skill-container input-box-container">
        <p className="Heading">Skills</p>
        <TextField
          id="skill-add"
          label="Add Skill"
          variant="standard"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
          sx={{ width: "90%" }}
          onKeyDown={handleAddSkill} // Handle adding new skill on Enter
        />
        <div className="skill-button-container">
          {skills.map((skill) => (
            <button
              key={skill}
              className="skill-button"
              onClick={() => handleRemoveSkill(skill)} // Handle skill removal
            >
              {skill} ✖
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className="desu-but" onClick={handleUpdate}>
          Update Description
        </button>
      </div>
    </div>
  );
};

export default EditDes;
