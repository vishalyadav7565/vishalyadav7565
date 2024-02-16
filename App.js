import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [city, setCity] = useState('');
  let [show, setShow] = useState('');
  let [temp, setTemp] = useState(18.18);
  let [country, setCountry] = useState('');
  let [description, setDescription] = useState('');
  let [name, setName] = useState('');
  let [icon, setIcon] = useState('');
  let[loding, setLoding] = useState(false);
  // let[iconimage,seticonimage] = useState(ture);

  let getData = (event) => {
    setLoding(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`)
      .then((res) => res.json())
      .then((finaldata) => {
        console.log(finaldata);
        if (finaldata.cod === 404) { 
          console.log('Data not found');
          setShow(null); 
        } else {
          setShow(finaldata);
          setTemp(finaldata.main.temp)
          setCountry(finaldata.sys.country)
          setName(finaldata.name)
          setDescription(finaldata.weather[0].description)
          setIcon(finaldata.weather[0].icon)
          console.log(setShow,"this is setshow")
        }
        setLoding(true)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setShow(null);
      });

    event.preventDefault();
    setCity('');
  };

  return (
    <div className="App">
      <h1>Today weather</h1>
      <div className='navbar'>
        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter Your City" /><button>Search</button>
        </form>
      </div>
   
        
      {
        show !== null ?
          <div className='conatainer'>
            <div>
              <h2>{name}<span>{country}</span></h2>
            </div>
            <div>
              <h2>{temp}&#8451;</h2>
              <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
              <p>{description}</p>
            </div>
          
          </div>
          
          :
          "Data Not Found"
      }
    </div>
  );
}

export default App;
