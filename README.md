# Blastify
```Blastify is a Mac OS like UI used to display your Spotify data (Built-In Light☀️/Dark🌙 theme)```

The dock contains your top 10 artists and the desktop your top 50 tracks.

Clicking on any tracks will play it on your spotify<br>
\*-------\* on a playlist/album will display a list of tracks<br>
\*-------\* on an artist will display his top tracks and on the next page his albums

![ui](https://user-images.githubusercontent.com/42273436/194401236-cb4ec661-156a-48be-976a-851f28264462.png)


## Built with
-  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

## Installation
1. Create a new **App** in the Spotify Dashboard (https://developer.spotify.com/dashboard/applications). You only need to specify the **redirect URI** and then get the **Client ID** of the App.
2. Clone the repo
```bash
git clone https://github.com/YungBricoCoop/blastify.git
cd blastify
```
3. Install the dependencies
```bash
npm install
```
4. Create a **constants** folder containing a **contstants.js** file in the **src** folder (src/constants/constants.js) : 
```js
const constants = {

    CLIENT_ID: 'YOUR_SPOTIFY_CLIENT_ID',
    REDIRECT_URI: 'http://your_redirect_url',
    SCOPES: 'user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-read-private playlist-modify-private app-remote-control streaming user-library-read',
    RESPONSE_TYPE: 'token',
    AUTH_URL: 'https://accounts.spotify.com/authorize',
    API_URL: 'https://api.spotify.com/v1',
}

export default constants;
```

## Run 
```bash
npm start
```

## Screensots

### --- Artist top tracks ---
![ui_artist](https://user-images.githubusercontent.com/42273436/194402954-5f5a9690-2317-412d-99c6-c45dc4395bf4.png)
![ui_artist_album_tracks_light](https://user-images.githubusercontent.com/42273436/194403790-512b7b14-c5b7-4c76-9a27-186522ed5f53.png)

### --- Artist albums ---
![ui_artist_albums](https://user-images.githubusercontent.com/42273436/194403024-e18b3af6-d3e1-4687-8b2b-6290612c6a00.png)
![ui_artist_albums_light](https://user-images.githubusercontent.com/42273436/194403942-5a519a2b-1dcb-4653-a514-ebd8bd44ac13.png)

### --- Album ---
![ui_artist_album_tracks](https://user-images.githubusercontent.com/42273436/194403992-c40fa119-d44a-4ef1-9430-1a2693dc29bd.png)
![ui_artist_album_tracks_light2](https://user-images.githubusercontent.com/42273436/194404255-0bd375a0-92dc-4174-9590-7a0a62022cb9.png)

### --- Playlist ---
![ui_playlist](https://user-images.githubusercontent.com/42273436/194404473-bd8cd8f1-7e65-4cb6-b8af-8bf75f3df756.png)
![ui_playlist_light](https://user-images.githubusercontent.com/42273436/194404480-7de20522-3ab8-4fcc-bc9a-8bf8dd389a46.png)
