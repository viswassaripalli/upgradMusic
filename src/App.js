import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "./Chart";
function App() {
  const [country, setCountry] = useState("india");

  const [state, setState] = useState(1);
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   fetchapi();
  // });
  const fetchapi = () => {
    var api =
      "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" +
      country +
      "&api_key=1860cfefc2bccd102f8437ff38667f0f&format=json";

    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson);
        setState(1);
      });
  };
  var c = "";
  const searchChangeHandler = event => {
    //console.log(event.target.value);
    c = event.target.value;
  };
  const clickHandler = () => {
    setState(0);
    fetchapi();
    setCountry(c);
  };
  const Frame = props => {
    if (props.state === 0) {
      return (
        <div className="card">
          <h1 style={{ textAlign: "center" }}>loading...</h1>
        </div>
      );
    } else {
      return <Chart country={country} />;
    }
  };

  return (
    <div className="App">
      <h1 className="title">top tracks in {country} </h1>
      <select className="dropdown" onChange={searchChangeHandler}>
        <option value="india">india</option>
        <option value="france">france</option>
        <option value="canada">canada</option>
        <option value="china">china</option>
        <option value="greece">greece</option>
        <option value="japan">japan</option>
      </select>
      <button onClick={clickHandler}>Search</button>
      <Frame state={state} />
    </div>
  );
}

export default App;
