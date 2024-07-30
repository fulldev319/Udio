# Music Streaming App

This repository contains some skeleton code for a music streaming app. The
frontend is a React SPA using Typescript and Sass, and the backend is a Django
API server. We have created a dataset in `backend/db.sqlite3` and some initial static assets.
The schema of this dataset is described as a Django model: `backend/musicblob/models.py`.

Not all functionality is implemented, and existing functionality
may be suboptimal or buggy.

Your task is open-ended: to improve the app in whatever way you want.
For example, you could:

- Improve the UI and appearance of the app
- Implement new features or fix existing bugs
- Optimize the app, e.g. improving database queries or even rewriting the API server
  in your preferred language/framework
- Improve testing or the development workflow
- Anything else you could think of!

This is a git repo; please commit your changes as you normally would if you were developing this application
as part of a team.

We recommend spending 2-3 hours on this, but you may spend as little or as much time
as you want.
You also do not need to fix or implement everything --- note down anything that you'd
like to do but weren't able to get to, and we can discuss in the followup conversation.

## Install Dependencies

### Python Deps for Back-End

1. Set up a virtual environment: `python -m venv .venv`
   (on Windows `.venv\Scripts\activate`)
1. Activate virtual environment: `source .venv/bin/activate`
1. Install python deps: `pip install -r requirements.txt`

### Install Node

If your machine does not have Node installed, install a current version with NVM or with your preferred installation method.

- Instructions here: https://github.com/nvm-sh/nvm
- Note: If you are using Apple Silicon, you must use NVM or your installation will likely fail

### Install Node dependencies for Front-End

1. `cd frontend`
1. `npm install`

## Features

### 1. Song Playback

- **Play, Pause, Rewind, and Fast Forward:**
  - Play and pause music using the play/pause button.
  - Rewind and fast forward using the respective buttons.
- **Progress Bar:**
  - View and adjust the play position with a draggable progress bar.
- **Playbar:**
  - Displays the currently playing song with album art, title, and artist.

### 2. Playlist Management

- **Add to Playlist:**
  - Users can add songs to their playlist from the song list.
- **Remove from Playlist:**
  - Users can remove songs from their playlist, which also updates the playbar if the removed song was currently selected.
- **Play Selected Song:**
  - Clicking a song in the playlist updates the playbar to show the selected song.
- **Hide Playbar:**
  - The playbar hides when the song is removed from the playlist.

### 3. User Authentication

- **Login and Sign Up:**
  - Users must log in to listen to music or add songs to their playlist.
- **Session Management:**
  - Tracks user login status to control access to features.

### 4. Search Functionality

- **Search Songs:**
  - Users can search for songs by title.
- **Empty State Handling:**
  - Displays a message if no songs match the search criteria.

### 5. Lazy Loading

- **Infinite Scrolling:**
  - Automatically loads more songs as the user scrolls to the bottom of the page.
- **Loading Indicator:**
  - Shows a loading message while fetching more songs.

### 6. Responsive Design

- **Mobile and Desktop Friendly:**
  - The app is designed to be responsive, ensuring a smooth experience on both mobile and desktop devices.

## Launch instructions

To launch the app, run `./launch.sh` in the root directory.

## License

All songs in backend/musicblob/static have been licensed from Artlist.io
for the purpose of this demo app.
Do not use these assets for any other purpose.
