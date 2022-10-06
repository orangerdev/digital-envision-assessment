/**
 * Get spotify token
 * @returns string - the access token
 */
export const getSpotifyToken = async () => {
  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }).then((res) => res.json());

  return token.access_token;
}

/**
 * Get spotify new releases
 * @param string token 
 * @returns 
 */
export const getSpotifyNewReleases = async (token) => {
  const newReleases = await fetch(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return newReleases;
}

/**
 * Get spotify featured playlists
 * @param string token 
 * @returns 
 */
export const getSpotifyFeaturedPlaylists = async (token) => {
  const featuredPlaylists = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return featuredPlaylists;
}

/**
 * Get spotify categories
 * @param string token 
 * @returns 
 */
export const getSpotifyCategories = async (token) => {
  const categories = await fetch("https://api.spotify.com/v1/browse/categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return categories;
}