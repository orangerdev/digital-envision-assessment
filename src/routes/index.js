import React, { useEffect, useState } from 'react';
import { getSpotifyToken } from '../helpers/spotify';
import Discover from './Discover';

export default function Routes() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!token) {
      getSpotifyToken().then((token) => {
        window.localStorage.setItem("token", token);
        setToken(token);
      });
    } else {
      setToken(token);
    }

  }, [])
  
  // Here you'd return an array of routes
  return <Discover token={token} />;
}
