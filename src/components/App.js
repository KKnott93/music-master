import React, { Component } from "react";
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component {
  state = { artist: null, tracks: [] };

  componentDidMount() {
    this.searchArtist('Cage the Elephant');
  }

  searchArtist = (artistQuery) => {
    // console.log('state: ', this.state.artistQuery);
    // console.log(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data.artists.total > 0) {
          const artist = data.artists.items[0];

          // console.log("artist", artist);
          this.setState({ artist });

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(response => response.json())
            .then(json => {
              this.setState({ tracks: json.tracks });
            })
            .catch(error => alert(error.message));
        }
      })
      .catch(error => alert(error.message));

    // console.log(this.state);
  }

  render() {
    // console.log('this.state')
    return (
      <div>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;
