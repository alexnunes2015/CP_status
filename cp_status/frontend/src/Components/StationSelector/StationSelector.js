import React, { Component } from "react";

class StationSelector extends Component {
  state = {
    station: "",
    stationList: [],
  };

  handleChange = (event) => {
    this.setState({ station: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(
        `https://www.infraestruturasdeportugal.pt/negocios-e-servicos/estacao-nome/${this.state.station}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => this.setState({ stationList: data }))
        .catch((error) => console.error(error));
      
  };

  render() {
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
        <ul>
          {this.state.stationList.map((station) => (
            <li key={station.id}>{station.name}</li>
          ))}
        </ul>
      </form>
    );
  }
}

export default StationSelector;
