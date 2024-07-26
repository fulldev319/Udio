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

## Launch instructions

To launch the app, run `./launch.sh` in the root directory.

## License

All songs in backend/musicblob/static have been licensed from Artlist.io
for the purpose of this demo app.
Do not use these assets for any other purpose.
