# Porzeczka Petsitter

A modern, interactive website offering pet sitting services with a light-hearted graphic style and vibrant color palette. This project is built with Next.js, Tailwind CSS, and Framer Motion for animations and interactive elements.

## Features

- Responsive design that works on all device sizes
- Interactive UI elements with Framer Motion animations
- Modern design with a light and playful color scheme
- Optimized for performance and SEO

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Spring](https://react-spring.dev/) - Physics-based animation library
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/porzeczka-petsitter.git
cd porzeczka-petsitter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
porzeczka-petsitter/
├── app/
│   ├── components/
│   │   ├── home/             # Home page components
│   │   ├── layout/           # Layout components (Navbar, Footer)
│   │   └── ui/               # Reusable UI components
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/                   # Static assets
│   └── images/               # Image assets
└── ...                       # Configuration files
```

## Customization

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: #FF8C69;   /* Coral */
  --secondary: #8AD2FF; /* Light Blue */
  --tertiary: #FFD56A;  /* Light Yellow */
  --accent: #BAE56B;    /* Light Green */
  --background: #FFF8F4; /* Off White */
  --text: #333333;      /* Dark Gray */
}
```

### Adding Pages

Create new pages in the `app` directory following the Next.js App Router conventions.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern interactive websites
- Pet illustrations and images from [relevant sources]

## Instagram API Integration

This website integrates with Instagram's Basic Display API to display your Instagram posts. Follow these steps to set it up:

### Step 1: Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Click on "My Apps" and then "Create App"
3. Select "Consumer" as the app type
4. Fill in the app name (e.g., "Porzeczka Petsitter") and contact email
5. Click "Create App"

### Step 2: Add Instagram Basic Display

1. In your new app dashboard, click "Add Products" in the left menu
2. Find "Instagram Basic Display" and click "Set Up"
3. On the next page, click "Create New App" to create an Instagram app ID

### Step 3: Configure App Settings

1. In the Instagram Basic Display settings:
   - Add your website URL to the "Valid OAuth Redirect URIs" field
   - Add your website URL to the "Deauthorize Callback URL" field
   - Add your website URL to the "Data Deletion Request URL" field
2. Save changes

### Step 4: Add an Instagram Test User

1. Go to "Roles" > "Instagram Testers"
2. Click "Add Instagram Testers" and enter your Instagram username
3. Open Instagram on your phone or browser
4. Go to Settings > Apps and Websites > Tester Invites
5. Accept the invitation from your app

### Step 5: Get an Access Token

1. Go to the Instagram Basic Display settings page
2. Click "Generate Token" under User Token Generator
3. Log in with your Instagram account and authorize the app
4. Copy the generated token

### Step 6: Configure Environment Variables

1. Create a `.env.local` file in the root of the project (or use your hosting provider's environment variables)
2. Add the following variables:

```
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_REDIRECT_URI=your_redirect_uri
INSTAGRAM_LONG_LIVED_TOKEN=your_token
```

### Important Notes

- The token generated is short-lived and will expire in about 1 hour.
- To create a long-lived token (valid for 60 days), you need to exchange the short-lived token using the `/access_token` endpoint.
- Consider setting up a token refresh system for production use.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

```bash
# Build for production
npm run build

# Start the production server
npm start
```
