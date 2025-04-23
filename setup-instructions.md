# Setup Instructions to Fix Deployment Differences

Follow these steps to ensure your local environment and Vercel deployment look and function the same:

## 1. Environment Variables Setup

1. Create a `.env.local` file in your project root with these variables:

```
# Instagram API credentials
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
INSTAGRAM_REDIRECT_URI=https://your-domain.com/api/instagram/callback
INSTAGRAM_LONG_LIVED_TOKEN=your_instagram_long_lived_token

# Google Calendar API
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

2. Add these same environment variables to your Vercel project:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add each variable from your `.env.local` file
   - Redeploy your project

## 2. Verify Local Production Build

Before deploying to Vercel, verify the production build works correctly locally:

```bash
# Build the project
npm run build

# Start the production server
npm run start
```

Visit http://localhost:3000 and check if it looks correct. This mimics how your site will look on Vercel.

## 3. Check Image Optimization

Your next.config.js has been updated to always optimize images. This will make the image behavior consistent across environments.

## 4. Clean up PostCSS Configuration

The duplicate PostCSS configuration file (postcss.config.mjs) has been removed to avoid conflicts.

## 5. Update Environment Variable Usage

Any hardcoded values in your code have been replaced with environment variables. Make sure these are properly set in both local and Vercel environments.

## 6. Clear Cache

After deploying to Vercel, clear your browser cache when testing the site to ensure you're seeing the latest version:

- Chrome: Press Ctrl+Shift+Delete (Windows/Linux) or Cmd+Shift+Delete (Mac)
- Firefox: Press Ctrl+Shift+Delete (Windows/Linux) or Cmd+Shift+Delete (Mac)
- Safari: Press Option+Cmd+E

## 7. Fonts and Assets

Make sure any custom fonts or assets are properly included in both environments. Check your public directory and make sure all assets are being deployed correctly.

## 8. Deployment Command

Ensure you're using the correct deployment command in Vercel:

```
npm run build
```

This will properly build your Next.js application with all the optimizations. 