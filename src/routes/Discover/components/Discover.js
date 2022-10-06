import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props }
  }

  componentDidUpdate() {
    // Promise.all([
    //   getSpotifyNewReleases(this.state.token),
    //   getSpotifyFeaturedPlaylists(this.state.token),
    //   getSpotifyCategories(this.state.token),
    // ]).then(([newReleases, playlists, categories]) => { 
    //   this.setState((prevData) => {
    //     return {
    //       ...prevData,
    //       newReleases: newReleases?.albums?.items ? newReleases.albums.items: [],
    //       playlists: playlists?.playlists?.items ? playlists.playlists?.items: [],
    //       categories: categories?.categories?.items ? categories.categories.items: [],
    //     };
    //   })
    // });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
