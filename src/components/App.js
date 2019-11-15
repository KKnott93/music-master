import React, { Component } from "react";
import Artist from './Artist';
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component {
  state = { artistQuery: '', artist: null, tracks: [] };

  updateArtistQuery = (event) => {
    // console.log('event.target.value: ', event.target.value);
    this.setState({ artistQuery: event.target.value });
  }

  searchArtist = () => {
    // console.log('state: ', this.state.artistQuery);
    // console.log(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data.artists.total > 0) {
          const artist = data.artists.items[0];

          console.log("artist", artist);
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

    console.log(this.state);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchArtist();
    }
  }
  render() {
    console.log('this.state')
    return (
      <div>
        <h2>Music Master</h2>
        <input
          onKeyPress={this.handleKeyPress}
          onChange={this.updateArtistQuery}
          placeholder="Search for an Artist" />
        <button onClick={this.searchArtist}>Search</button>
        <Artist artist={this.state.artist} />
      </div>
    );
  }
}

export default App;
