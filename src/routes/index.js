import React, { useEffect, useState } from 'react';
import { getSpotifyToken } from '../helpers/spotify';
import Discover from './Discover';
import { getSpotifyNewReleases, getSpotifyFeaturedPlaylists, getSpotifyCategories } from '../helpers/spotify';

export default function Routes() {
  const [data, setData] = useState({ newReleases: [], playlists: [], categories: [] })
  const [token, setToken] = useState("")


  useEffect(() => {
    Promise.all([
      getSpotifyNewReleases(token),
      getSpotifyFeaturedPlaylists(token),
      getSpotifyCategories(token),
    ]).then(([newReleases, playlists, categories]) => {
      setData({
        newReleases: newReleases?.albums?.items ? newReleases.albums.items : [],
        playlists: playlists?.playlists?.items
          ? playlists.playlists?.items
          : [],
        categories: categories?.categories?.items
          ? categories.categories.items
          : [],
      });
    });
  }, [token])

  useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!token) {
      getSpotifyToken().then((token) => {
        window.localStorage.setItem("token", token);
        setToken(token)
      });
    } else {
      setToken(token); 
    }
  }, []);
  
  // Here you'd return an array of routes
  return <Discover {...data} />;
}
