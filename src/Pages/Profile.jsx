import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config/global';
import "../css/Profile.css";
const Profile = () => {

  const [visible, setVisible] = useState("");

  const navigate = useNavigate();
  const [res, setRes] = useState({});
  const [state, setState] = useState({});

  const [data, setData] = useState({
    name: "",
    email: "",
    DOB: "",
    gender: "",
    phoneNumber: "",
    age: "",
    state: ""
  });
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const userId = userInfo.id;
  const userToken = userInfo.token;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: res.name,
    email: res.email,
    DOB: "",
    gender: "",
    phoneNumber: "",
    age: "",
    state: false
  });






  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      getData(user.token);
      retriveData();

    }
  }, []);





  const getData = async (token) => {
    try {

      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${API_URL}/profile`, config);

      if (response.data === "Invalid Token") {
        alert("Login again");
      } else if (response.data === "Server Busy") {
        alert("Unauthorized access");
      } else if (response?.status) {
        setRes(response.data.auth_token);


      }
    } catch (e) {
      console.log(e);
    }
  };




  const handleEditClick = () => {
    setEditMode(true);

  };

  function validGender(gender) {
    console.log('Gender validation called');


    const isValidInput = /^(Male|Female|Others)$/i.test(gender);

    if (isValidInput) {
      console.log('Valid Gender');
      return true;
    } else {

      alert('Check the Input Gender (Male, Female, or Others)');

      return false;
    }
  }




  function validPhoneNumber(phoneNumber) {
    console.log('Phone number validation called');


    const isValidNumber = /^\d{10}$/.test(phoneNumber);

    if (isValidNumber) {
      console.log('Valid Phone number');
      return true;

    } else {
      alert('Invalid Phone number');

      return false;
    }
  }

  function validPhoneNumber(phoneNumber) {
    console.log('Phone number validation called');


    const isValidNumber = /^\d{10}$/.test(phoneNumber);

    if (isValidNumber) {
      console.log('Valid Phone number');
      return true;

    } else {
      alert('Invalid Phone number');

      return false;
    }
  }
  function validDOB(date) {
    console.log('DOB validation called');


    const isValidInput = /^\d{2}\/\d{2}\/\d{4}$/.test(date);

    if (isValidInput) {

      console.log('Valid DOB');
      return true;
    } else {

      alert('Check the Input DOB format (dd/MM/yyyy)');

    }
  }


  function multifunctioncall() {
    const isValid =
     validDOB(formData.DOB) &&
      validGender(formData.gender) &&
      validPhoneNumber(formData.phoneNumber);


    if (isValid) {
      console.log('All validations passed. Proceeding with logic...');
      setEditMode(false);
      update();
      retriveData();
    } else {

      console.log('Validation failed. Check console for details.');
    }
  }


  function multifunctioncallspeci() {
    const isValid =
      validPhoneNumber(formData.phoneNumber);


    if (isValid) {
      console.log('All validations passed. Proceeding with logic...');
      setEditMode(false);
      specificupdate();
      retriveData();
    } else {

      console.log('Validation failed. Check console for details.');
    }
  }
  const handleUpdateClick = () => {


    const appear = localStorage.getItem("appear");

    if (appear === "true") {
      multifunctioncall();
    } else {
      multifunctioncallspeci();
    }



  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setFormData({
      ...formData,
      DOB: formattedDate,
      age: calculateAge(date),
    });
  };


  const calculateAge = (DOB) => {
    if (DOB instanceof Date) {
      const currentYear = new Date().getFullYear();
      const birthYear = DOB.getFullYear();
      return currentYear - birthYear;
    }
    return 0;
  };





  const update = async (e) => {

    console.log(formData.DOB);
    try {
      const response = await axios.put(`${API_URL}/update/${res.id}`, {
        DOB: formData.DOB,
        age: formData.age,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        state: formData.state
      });
      if (response.data && response.data.message !== undefined) {
        const messageValue = response.data.message;

        if (messageValue === 'User not found') {
          alert("User not Exits, Update failed");
          console.log("User not Exits, Update failed");
          navigate("/");
        } else if (messageValue === "User updated successfully") {
          console.log("Details Updated Successfully");
          alert("Details Updated Successfully");
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during Update Details:", error);
    }

  };


  const specificupdate = async (e) => {

    console.log(formData.DOB);
    try {
      const response = await axios.put(`${API_URL}/update/${res.id}`, {
        phoneNumber: formData.phoneNumber,
      });
      if (response.data && response.data.message !== undefined) {
        const messageValue = response.data.message;

        if (messageValue === 'User not found') {
          alert("User not Exits, Update failed");
          console.log("User not Exits, Update failed");
          navigate("/");
        } else if (messageValue === "User updated successfully") {
          console.log("Details Updated Successfully");
          alert("Details Updated Successfully");
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during Update Details:", error);
    }

  };

  const retriveData = async () => {
    try {
      const response = await axios.get(`${API_URL}/update/retrive/${userId}`);
      if (response.data && response.data.message !== undefined) {
        const messageValue = response.data.message;

        if (messageValue === 'User not found') {
          alert("User not Exists, fetch data failed");
          console.log("User not Exists, fetch data failed");
          navigate("/");
        } else if (messageValue === "User found") {
          console.log("Fetch Details Successfully");
          // console.log(response.data);
          setData(response.data.user);

          const appear = response.data.user.state;
          localStorage.setItem("appear", appear);
          if (appear === "true") {
            setVisible(true);
          }

        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during fetching details:", error);
    }
  };
  const [selectedDate, setSelectedDate] = useState(null);



  const renderFields = () => {
    if (editMode) {
      return (
        <>
          <form className="row">
            <label htmlFor="date" className="col-1 col-form-label">Email</label>
            <div className="col-5">
              <div className="input-group date">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled
                />
                <span className="input-group-append">
                  <span className="input-group-text bg-light d-block">
                    <i className="fa fa-envelope"></i>
                  </span>
                </span>
              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">DOB</label>
            <div className="col-5">
              <div className="input-group date Date">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  disabled={!(editMode && visible)} required
                />
                <span className="input-group-append">
                  <span className="input-group-text bg-light d-block">
                    <i className="fa fa-calendar"></i>
                  </span>
                </span>
              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Gender</label>
            <div className="col-5">
              <div className="input-group date">
                <select
                  className="form-control"
                  id="genderSelect"
                  aria-label="Default select example"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!(editMode && visible)}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <span className="input-group-append">
                  <span className="input-group-text bg-light d-block">
                    <i className="fa fa-intersex"></i>
                  </span>
                </span>
              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Mobile</label>
            <div className="col-5">
              <div className="input-group date">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]*"
                  className="form-control"
                />
                <span className="input-group-append">
                  <span className="input-group-text bg-light d-block">
                    <i className="fa fa-address-book"></i>
                  </span>
                </span>
              </div>
            </div>
          </form>
          
          {visible ==="" ?
            <><label>You can only change phone number</label></> : <></>
          }

        </>
      );
    }

    else {
      return (
        <>
          <form className="row">
            <label htmlFor="date" className="col-1 col-form-label">Name</label>
            <div className="col-5">
              <div className="input-group date">
                <div className="input-group date">
                  {data.name}

                </div>
              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Email</label>
            <div className="col-5">
              <div className="input-group date">
                {data.email}

              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">DOB</label>
            <div className="col-5">
              <div className="input-group date">
                {data.DOB}

              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Age</label>
            <div className="col-5">
              <div className="input-group date">
                {data.age}

              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Gender</label>
            <div className="col-5">
              <div className="input-group date">
                {data.gender}

              </div>
            </div>
            <label htmlFor="date" className="col-1 col-form-label">Mobile</label>
            <div className="col-5">
              <div className="input-group date">
                {data.phoneNumber}

              </div>
            </div>
          </form>
        </>
      );
    }
  };

  function logout() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const [DOB, setDob] = useState(new Date());


  return (
    <Container className="layout">
      <h1>Profile</h1>
      {renderFields()}
      {editMode ? (
        <Button variant="primary" className='update space' onClick={handleUpdateClick}>Update</Button>
      ) : (
        <Button variant="secondary" className='edit space' onClick={handleEditClick}>Edit</Button>
      )}
      <Button variant='danger' className='logout space' onClick={logout}>Logout</Button>
    </Container>
  );

}

export default Profile
