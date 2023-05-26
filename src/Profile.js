import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
    let params = useParams();
    let id = params.id

    let data_url = "http://localhost:5000";

    const [dataId, setDataId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [phone, setPhone] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [name, setName] = useState('');
    const [manager_id, setManagerId] = useState('');
    const [picture, setPicture] = useState(null);
    const [isEditing, setEdit] = useState(false);

    const grabLocation = useLocation();
    const navigate = useNavigate();

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleJobChange = (event) => {
        setJobRole(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSalaryChange = (event) => {
        setSalary(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePicChange = (event) => {
        const file = event.target.files[0];
        setPicture(file);
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleSave = () => {
        const updatedProfile = {
            name: name,
            phone: phone,
            jobRole: jobRole,
            location: location,
            salary: salary, 
            picture: picture
        };

        //api request to update profile
        axios.put(`${data_url}/api/profile/${dataId}`, updatedProfile)
        .then(response => {
            setEdit(false);
            getProfile(id);
            console.log('Profile info updated!');
        })
        .catch(error => {console.error('Error occurred while saving profile info', error);
    });
};

    const getProfile = (id) => {
        try{
            const response = axios.get(`${data_url}/api/profile/${id}`)
            .then((response) => {
                setName(response.data.name);
                setPhone(response.data.phone_number);
                setJobRole(response.data.job_role);
                setLocation(response.data.work_location);
                setSalary(response.data.salary);
                setManagerId(response.data.manager_id);
                setDataId(response.data._id);
                setEmployeeId(response.data.employee_id);
        })
        } catch(error) {
            console.log('Error Occurred: ', error);

        }       
    };
    
        const SalaryComponent = () => {
            switch(grabLocation.state.access_level){
                case ('3') :
                    console.log('this person has hr access');    
                    break;
                case ('2') :
                    console.log('this person has manager access');
                    break;
                default :
                console.log('this person has regular user access');
                
            }
        }


         //logout button
    const handleLogout = () => {
        sessionStorage.clear();
        console.log('Logout Successful');
        navigate('/');
    };

    //back button
    const handleBack = () => {
        navigate('/directory', {state: {employee_id: grabLocation.state.employee_id, access_level: grabLocation.state.access_level}});
    };
    
        useEffect(() => SalaryComponent(), []);

        useEffect (() => getProfile(id), []);



    return (
        <div className="profile-page">
             <img className="profile-logo" src="https://res.cloudinary.com/value-penguin/image/upload/c_limit,dpr_1.0,f_auto,h_1600,q_auto,w_1600/v1/referral_logos/us/insurance/travelers-2"/>
            {/* <h2>Profile Information</h2> */}
            <form className="profile-info">
                <h1 className="profile-header">Employee Info</h1>
                <div className="profile-item">
                <label>
                    <strong>Name: </strong>{ isEditing ? (<input type = "text" value={name} onChange={handleNameChange} /> 
                    ) : (<span> {name}</span>)}
                </label>
                </div>
            
                <div className="profile-item">
                <label>
                <strong>Phone Number: </strong>{ isEditing ? (<input type = "text" value={phone} onChange={handlePhoneChange} /> 
                    ) : (<span> {phone}</span>)}
                </label>
                </div>
          
                <div className="profile-item">
                <label>
                <strong>Job Role: </strong>{ isEditing ? ( <input type = "text" value={jobRole} onChange={handleJobChange} />
                    ) : (<span> {jobRole}</span>)}
                </label>
                </div>
        
                <div className="profile-item">
                <label>
                <strong>Work Location: </strong>{ isEditing ? ( <input type = "text" value={location} onChange={handleLocationChange} />
                    ) : (<span> {location}</span>)}
                </label>
                </div>
                <div className="profile-item">
                { (isEditing && grabLocation.state.access_level === '3')|| (isEditing && grabLocation.state.employee_id === manager_id)? (<label><strong>Salary:</strong> $ <input type = "text" value={salary} onChange={handleSalaryChange} /></label>) : (<label>
                     { (grabLocation.state.access_level === '3') || (grabLocation.state.employee_id === manager_id) || (grabLocation.state.employee_id === employeeId) ? ( <span><strong>Salary:</strong> ${salary}</span>
                     ) : (<span></span>)}   
                </label>)}
                </div>
 
                {/* <label>
                    Profile Pic: <input type = "file" accept='image/*' onChange={handlePicChange} />
                </label> */}
                {/* <br /> */}
                {(grabLocation.state.access_level > 1) && !isEditing ? ( <button className="edit-button" type ="button" onClick={handleEdit}>Edit</button>) : (<span></span>)}
                    { isEditing ? (
                        <button className="save-button" type ="button" onClick={handleSave}>Save</button>
                    ) : ( 
                        <span></span>
                    )}
                
                <button className="back-button" onClick={handleBack}>Back</button>
            </form>
            
            <button className="logoutPos" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;