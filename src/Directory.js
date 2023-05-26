import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Directory = () => {
    const location = useLocation();
    //state for search query and search results
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    

    //handle search action 
    let data_url = "http://localhost:5000/api/directory";

    const fetchEmployees = () => {
        fetch(data_url)
        .then((res) => res.json())
        .then((employeeList) => {
            setEmployees(employeeList);
        });
    };


    const handleSearch = () => {
        //filter based on query
        const filteredResults = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    useEffect (fetchEmployees, []);

    //go to profile page
    const goToProfile = (employee, state) =>{
        navigate(`/profile/${employee.employee_id}`, {state: {employee_id: state.employee_id, access_level: state.access_level}});
    }

    //logout button
    const handleLogout = () => {
        sessionStorage.clear();
        console.log('Logout Successful');
        navigate('/');
    };


    return (
        
        <div className='background'>
            <h1 className="header">Enterprise Employee Directory</h1>
            <input className="searchInput"
             type = "search"
             value = {searchQuery}
             onChange = {(e) => 
            setSearchQuery(e.target.value)}
             placeholder = "Search by name"
             />
            <button className='searchButton' onClick={handleSearch}>Search </button>
            <div>
            {searchResults.length > 0  ? (
            <ul>
                {searchResults.map((employee) => (
                    <li className='right' key={employee._id} onClick={() => goToProfile(employee, location.state)}>
                        <strong > Name: </strong> {employee.name} <br/>
                        <strong> Phone: </strong> {employee.phone_number} <br/>
                        <strong> Job Role: </strong> {employee.job_role} <br/> 
                        <strong> Work Location: </strong> {employee.work_location} <br/>
                        </li>
                ))}
            </ul>
            ) : (
            <p> No results found. </p>
            )}       
            </div>
            <button className='logoutPos' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Directory;