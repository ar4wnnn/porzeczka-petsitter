# Deployment Guide for Porzeczka Pet Sitter

This document outlines how to deploy the Porzeczka Pet Sitter website to production.

## Prerequisites

- Node.js 18.x or later
- A hosting provider that supports Next.js applications
- GitHub account (if using GitHub-based deployments)

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
# Instagram API credentials (if using Instagram feed)
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
INSTAGRAM_REDIRECT_URI=https://your-domain.com/api/instagram/callback
INSTAGRAM_LONG_LIVED_TOKEN=your_instagram_long_lived_token

# Add any other environment variables your app needs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Sign up for a [Vercel account](https://vercel.com/signup)
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`
4. Add your environment variables in the Vercel project settings
5. Deploy

Vercel will automatically deploy your application and provide you with a URL.

### Option 2: Netlify

1. Sign up for a [Netlify account](https://app.netlify.com/signup)
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `npm run build && npm run export`
   - Publish Directory: `out`
4. Add your environment variables in the Netlify project settings
5. Deploy

### Option 3: Traditional Hosting

1. Build your application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm run start
   ```

3. Use a process manager like PM2 to keep your application running:
   ```
   npm install -g pm2
   pm2 start npm --name "porzeczka-petsitter" -- start
   ```

## Custom Domain Setup

After deploying, you can set up a custom domain through your hosting provider's dashboard.

1. Purchase a domain name from a domain registrar
2. Add the domain in your hosting provider's dashboard
3. Follow the provider's instructions to configure DNS settings
4. Set up HTTPS/SSL for your domain

## Post-Deployment Checks

After deploying, verify that:

1. All pages load correctly
2. Images are loading properly
3. Forms are submitting as expected
4. The Instagram feed is displaying correctly (if implemented)
5. The site is responsive on mobile devices

## Maintenance

To update the site after making changes:

1. Push changes to your GitHub repository
2. If using Vercel or Netlify, the site will automatically rebuild and deploy
3. For traditional hosting, pull the latest changes and rebuild:
   ```
   git pull
   npm run build
   pm2 restart porzeczka-petsitter
   ``` 