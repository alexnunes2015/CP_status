import React, { Component } from "react";
import TimeTable from "../TimeTable/TimeTable";

class StationSelector extends Component {
  state = {
    station: "",
    stationList: [],
    currentStationID:0
  };

  handleChange = (event) => {
    this.setState({ station: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(
        `https://127.0.0.1/getStation.php?estacao=${this.state.station}`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => this.setState({ stationList: data.response }))
        .catch((error) => console.error(error));
      
  };

  render() {
    if(this.state.currentStationID === 0){
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Estação"
            value={this.state.station}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
          <br />
          <br />
          {this.state.stationList.map((station) => (
            <button key={station.NodeID} onClick={() => this.setState({currentStationID: station.NodeID})}>{station.Nome}</button>
          ))}
        </form>
      );
    } else {
      return <TimeTable currentStationID={this.state.currentStationID} />
    }    
  }
}

export default StationSelector;
