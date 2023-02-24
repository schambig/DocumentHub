// import { Save as SaveIcon } from '@mui/icons-material';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';

// interface Data {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
// }

// const EditableData: React.FC = () => {
//   const [data, setData] = useState<Data>({
//     id: 0,
//     name: '',
//     age: 0,
//     email: '',
//   });

//   useEffect((user: Data)  => {
//     fetch('http://localhost:8000/test/${user.id}') // Use fetch to retrieve data from local server
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, []);

//   const handleSave = () => {
//     fetch('http://localhost:8000/test/1', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data), // Send updated data to server
//     });
//   };

//   const handleChange = (field: keyof Data) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setData((prevData) => ({
//       ...prevData,
//       [field]: event.target.value, // Update corresponding field with new value
//     }));
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Typography variant="h5">User Data</Typography>
//       <TextField label="Name" value={data.name} onChange={handleChange('name')} />
//       <TextField label="Age" type="number" value={data.age} onChange={handleChange('age')} />
//       <TextField label="Email" value={data.email} onChange={handleChange('email')} />
//       <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
//         Save
//       </Button>
//     </Box>
//   );
// };

// export default EditableData;

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  idRol: number;
  status: boolean;
  nombreUser: string;
  email: string;
  password: string;
}

export const UserEditor = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User>({
    id: 0,
    idRol: 0,
    status: false,
    nombreUser: "",
    email: "",
    password: "",
  });
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/tUsuarios")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox") {
      setStatusCheckbox(event.target.checked);
    } else {
      setUserData({
        ...userData,
        [event.target.name]:
          event.target.type === "number"
            ? +event.target.value
            : event.target.value,
      });
    }
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/tUsuarios/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        status: statusCheckbox,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <Autocomplete
        id="user-select"
        options={users}
        getOptionLabel={(user) => user.nombreUser}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
          if (newValue) {
            setUserData(newValue);
            setStatusCheckbox(newValue.status);
          } else {
            setUserData({
              id: 0,
              idRol: 0,
              status: false,
              nombreUser: "",
              email: "",
              password: "",
            });
            setStatusCheckbox(false);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select User" variant="outlined" />
        )}
      />
      {selectedUser && (
        <div>
          <TextField
            name="id"
            label="ID"
            type="number"
            value={userData.id}
            onChange={handleChange}
          />
          <TextField
            name="idRol"
            label="Role ID"
            type="number"
            value={userData.idRol}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={statusCheckbox}
                onChange={handleChange}
                name="statusCheckbox"
              />
            }
            label="Active"
          />
          <TextField
            name="nombreUser"
            label="Name"
            value={userData.nombreUser}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            value={userData.password}
            onChange={handleChange}
            type="password"
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
          )}
        </div>
        );
      };