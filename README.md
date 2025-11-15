# lhebstore final package (ready for GitHub + Railway)

This package contains server + client ready to be pushed to a GitHub repository and deployed.

Files included:
- server.js (CORS-enabled, reads token/chat from env)
- package.json
- .env.example
- index.html (client - open or host it; edit apiEndpoint after deploying server)


## Recommended workflow (fastest, minimal steps)
1) Create a new GitHub repository (private is recommended).
2) Push the contents of this package to that repo (see commands below).
3) Deploy the server on Railway (or Render). Use the GitHub repo when creating a new Railway project.
   - On Railway add environment variables: TG_BOT_TOKEN and TG_CHAT_ID (values you have).
4) After deployment Railway provides a public URL like: https://<your-app>.up.railway.app
5) Edit `index.html` in the repo (or locally) and set `apiEndpoint` to `https://<your-app>.up.railway.app/notify` (no trailing slash).
6) Commit & push the updated `index.html`. Enable GitHub Pages (branch: main / folder: root) to serve the static site, or host `index.html` elsewhere.
7) Open the site URL (GitHub Pages link) and test registration. When user submits, the server forwards the message to your Telegram bot/chat.


## Git commands (from local folder)
```bash
git init
git add .
git commit -m "Initial commit – lhebstore notify server + client"
git branch -M main
# create a repo on GitHub and copy the SSH/HTTPS url, then:
git remote add origin https://github.com/YOURUSERNAME/REPO-NAME.git
git push -u origin main
```


## Railway quick deploy
1. Sign up / log in to https://railway.app
2. New Project -> Deploy from GitHub -> pick your repo
3. Set environment variables in Railway dashboard: TG_BOT_TOKEN, TG_CHAT_ID
4. Deploy and copy the service URL (e.g. https://your-app.up.railway.app)


## Important security notes
- Do NOT publish bot token in a public repo. Use private repos or use environment variables on the host platform.
- If token leaked, revoke via @BotFather and create a new token.
