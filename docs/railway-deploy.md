# Deploy To Railway

This project can be deployed to Railway, and the best first deployment is the web app only.

## What To Deploy First

Deploy `apps/web` first.

Why:

- It gives you a live frontend quickly
- It is the easiest part to test
- We can connect API and database after the UI is live

## Current Recommended Railway Setup

Use the repository root as the Railway project source, then set custom commands for the web app.

### Build command

`npm install && npm run build:web`

### Start command

`npm run start:web`

### Root directory

Leave empty for now.

This is important because the web app imports shared code from:

`packages/fragrance-engine`

If you set Railway root directory to `apps/web`, that shared package may not be available during build.

## Step-By-Step

### 1. Create a Railway project

1. Log in to [Railway](https://railway.app)
2. Click `New Project`
3. Choose `Deploy from GitHub repo`
4. Select:
   `faisal412a/Fragrance-AI-Advisor`

### 2. Configure the service

After Railway creates the service:

1. Open the service settings
2. Find the build and deploy configuration
3. Set:
   - Build Command: `npm install && npm run build:web`
   - Start Command: `npm run start:web`
4. Leave Root Directory blank

### 3. Add environment variables later if needed

At the moment, the web app does not require secret keys to render the current frontend.

That means you should be able to deploy the current web UI first without adding environment variables.

### 4. Trigger deployment

1. Save the settings
2. Click `Deploy`
3. Wait for the build logs

## Expected Result

If deployment succeeds, Railway will provide a public URL where you can view:

- the premium landing page
- the quiz UI
- the recommendation preview

## If Build Fails

The most likely early issues are:

1. Dependency install problem
2. Next.js workspace build issue
3. TypeScript compile issue

If that happens, copy the Railway build log and send it to me. I can help you fix it quickly.

## Next After Web Deployment

After the web app is live, we should do this:

1. Add a proper questionnaire submit flow
2. Add the API service to Railway
3. Add a database
4. Add live internet-enriched perfume data
