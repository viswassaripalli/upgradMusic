import React, { useState, useEffect } from "react";
import "./App.css";
import $ from "jquery";
import CardRow from "./CardRow";
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchapi(this.props.country);
  }
  fetchapi(country) {
    var api =
      "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" +
      country +
      "&api_key=1860cfefc2bccd102f8437ff38667f0f&format=json";

    $.ajax({
      url: api,
      success: searchResults => {
        console.log("success");
        const results = searchResults.tracks.track;
        console.log(results);
        var trackRows = [];
        results.forEach(track => {
          const trackRow = <CardRow track={track} />;
          trackRows.push(trackRow);
        });
        this.setState({ row: trackRows });
      },
      error: (xhr, status, err) => console.error("failed to fetch")
    });
  }

  render() {
    return <div className="chart">{this.state.row}</div>;
  }
}
export default Chart;
