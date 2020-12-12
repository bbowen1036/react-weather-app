import React, { useState }  from 'react';

import './App.css';

const api = {
  key: 'fbfe64de86225451fd088542861b90ae',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [ query, setQuery ] = useState('');
  const [ weather, setWeather ] = useState('');

  const search = (e) => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(res => {
          setWeather(res);
          setQuery('');
          debugger
        })

    }
  };
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // let [hour, minute, second] = d.toLocaleTimeString("en-US").split(/:| /)
    return `${day}, ${date} ${month} ${year}`
  };

  const timeBuilder = (d) => {
    let hours = d.getHours();
    let [hour, minute] = d.toLocaleTimeString("en-US").split(/:| /)
    return `${hour}:${minute} ${(hours > 12) ? 'PM' : 'AM'}`
  };

  
  
  const background = () => {
    return (typeof weather.main !== 'undefined') 
      ? ((weather.main.temp > 60) ? 'app warm' : 'app') 
      : 'app'
  };
  
  
  return (
    <div className={background()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        { (typeof weather.main !== 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
               {weather.main.temp.toFixed(1)}°f
              </div>
             <div className="weather">{weather.weather[0].main}</div>
             <img className="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            </div>

          </div>
        ) : null}
        
      </main>
    </div>
  );
}

export default App;
