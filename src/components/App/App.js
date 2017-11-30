import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
// this may be totally fucked! trouble shoot herefirst!
  addTrack(track) {
    if(this.state.playlistTracks.id !== this.props.key) {
      this.setState({playlistTracks: [track]});
    }
  }

  removeTrack(track) {
    if(this.state.playlistTracks.id !== this.props.key) {
      this.setState({playlistTracks: [track]});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);//may need to chain a THEN here
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }
// this may be a problem -- check syntax later if issues
  search(term) {
    const results = Spotify.search(term);
    this.setState({ searchResults: results });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.onRemove} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
