import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { getSpotifyFeaturedPlaylists, getSpotifyNewReleases, getSpotifyCategories } from '../../../helpers/spotify';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      token: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { token: props.token };
  }

  componentDidMount() {
    Promise.all([
      getSpotifyNewReleases(this.state.token),
      getSpotifyFeaturedPlaylists(this.state.token),
      getSpotifyCategories(this.state.token),
    ]).then(([newReleases, playlists, categories]) => { 
      this.setState((prevData) => {
        return {
          ...prevData,
          newReleases: newReleases?.albums?.items ? newReleases.albums.items: [],
          playlists: playlists?.playlists?.items ? playlists.playlists?.items: [],
          categories: categories?.categories?.items ? categories.categories.items: [],
        };
      })
    });
  }

  render() {
    const { newReleases, playlists, categories, favoritecolor } = this.state;
    return (
      <div className="discover">
        {favoritecolor}
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
