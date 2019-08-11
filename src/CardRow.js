import React from "react";
import "./card.css";
import Modal from "react-modal";
class CardRow extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      active: false,
      isactive: false,
      image: "",
      listerner: "",
      count: "",
      tag: [],
      publish: "",
      similar: [],
      content: "",
      albumtitle: "",
      albumlistener: "",
      albumcount: "",
      toptags: [],
      albumpublished: "",
      albumcontent: ""
    };
  }
  componentWillMount() {
    Modal.setAppElement("body");
  }
  toggletrack = () => {
    var url =
      "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=1860cfefc2bccd102f8437ff38667f0f&mbid=" +
      this.props.track.mbid +
      "&format=json";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.message !== "Track not found") {
          this.setState({
            albumtitle: data.track.album.title,
            albumlistener: data.track.listeners,
            albumcount: data.track.playcount,
            toptags: data.track.toptags.tag,
            albumpublished: data.track.wiki.published,

            albumcontent: data.track.wiki.summary
          });
        } else {
          this.setState({
            message: data.message
          });
        }
      });
    this.setState({
      isactive: !this.state.isactive
    });
  };

  toggleModal = () => {
    var data;
    var url =
      "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=1860cfefc2bccd102f8437ff38667f0f&mbid=" +
      this.props.track.artist.mbid +
      "&format=json";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);

        this.setState({
          image: data.artist.image[4]["#text"],
          listener: data.artist.stats.listeners,
          count: data.artist.stats.playcount,
          tag: data.artist.tags.tag,
          publish: data.artist.bio.published,
          similar: data.artist.similar.artist,
          content: data.artist.bio.summary
        });
      });
    this.setState({
      active: !this.state.active
    });
    console.log(this.props.track.name);
  };

  render() {
    return (
      <div className="card">
        <img
          onClick={this.toggletrack}
          src={this.props.track.image[2]["#text"]}
          alt=""
        />
        <h4 onClick={this.toggletrack}>{this.props.track.name}</h4>

        <a onClick={this.toggleModal}>{this.props.track.artist.name}</a>
        <Modal isOpen={this.state.active} onRequestClose={this.toggleModal}>
          <img style={{ marginLeft: "40%" }} src={this.state.image} alt="" />
          <h1 style={{ textAlign: "center" }}>
            {this.props.track.artist.name}
          </h1>
          <h3 style={{ textAlign: "center" }}>
            {this.state.listener}
            <span style={{ color: "orange" }}> Listerners </span>
            {"    "}
            {this.state.count}
            <span style={{ color: "orange" }}> playcounts</span>
          </h3>
          <ul style={{ textAlign: "center" }}>
            {this.state.tag.map(item => (
              <button style={{ background: "orange" }} key={item}>
                {item.name}
              </button>
            ))}
          </ul>

          <h1 style={{ textAlign: "center" }}>
            Published On{" "}
            <span style={{ color: "orange" }}>{this.state.publish}</span>
          </h1>
          <h1 style={{ textAlign: "center", color: "orange" }}>
            Related artist
          </h1>
          <ul style={{ textAlign: "center" }}>
            {this.state.similar.map(item => (
              <button style={{ background: "orange" }} key={item}>
                {item.name}
              </button>
            ))}
          </ul>
          <p style={{ textAlign: "center" }}>{this.state.content}</p>
          <button
            style={{ textAlign: "center", marginLeft: "45%" }}
            onClick={this.toggleModal}
          >
            Close
          </button>
        </Modal>
        <Modal isOpen={this.state.isactive} onRequestClose={this.toggletrack}>
          {this.state.message != "Track not found" ? (
            <div>
              <img
                style={{ marginLeft: "40%" }}
                src={this.props.track.image[3]["#text"]}
                alt=""
              />
              <h1 style={{ textAlign: "center" }}>{this.props.track.name}</h1>
              <h3 style={{ textAlign: "center" }}>
                Album
                <span style={{ color: "orange" }}>
                  {" "}
                  {this.state.albumtitle}{" "}
                </span>
                Artist
                <span style={{ color: "orange" }}>
                  {" "}
                  {this.props.track.artist.name}
                </span>
              </h3>
              <h3 style={{ textAlign: "center" }}>
                {this.state.albumlistener}
                <span style={{ color: "orange" }}> Listerners </span>
                {"    "}
                {this.state.albumcount}
                <span style={{ color: "orange" }}> playcounts</span>
              </h3>
              <ul style={{ textAlign: "center" }}>
                {this.state.toptags.map(item => (
                  <button style={{ background: "orange" }} key={item}>
                    {item.name}
                  </button>
                ))}
              </ul>

              <h1 style={{ textAlign: "center" }}>
                Published On{" "}
                <span style={{ color: "orange" }}>
                  {this.state.albumpublished}
                </span>
              </h1>

              <p style={{ textAlign: "center" }}>{this.state.albumcontent}</p>
            </div>
          ) : (
            <h1 style={{ textAlign: "center" }}>{this.state.message}</h1>
          )}

          <button
            style={{ textAlign: "center", marginLeft: "45%" }}
            onClick={this.toggletrack}
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default CardRow;
