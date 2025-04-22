import { NextResponse } from 'next/server';

// Instagram API configuration - these would typically be environment variables
const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID || 'YOUR_INSTAGRAM_APP_ID';
const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET || 'YOUR_INSTAGRAM_APP_SECRET';
const INSTAGRAM_REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI || 'https://your-domain.com/api/instagram/callback';

// This long-lived token would be stored securely (in a database) after initial authorization
const INSTAGRAM_LONG_LIVED_TOKEN = process.env.INSTAGRAM_LONG_LIVED_TOKEN;

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username: string;
}

/**
 * Fetch media from Instagram Basic Display API using a long-lived access token
 */
async function fetchInstagramMedia(): Promise<InstagramMedia[]> {
  try {
    if (!INSTAGRAM_LONG_LIVED_TOKEN) {
      console.error('Instagram token not configured');
      return [];
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${INSTAGRAM_LONG_LIVED_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    return [];
  }
}

/**
 * API route handler to fetch Instagram posts
 */
export async function GET() {
  try {
    // For development/demo purposes, return mock data if no token is available
    if (!INSTAGRAM_LONG_LIVED_TOKEN) {
      return NextResponse.json({
        success: true,
        posts: getMockInstagramPosts(),
      });
    }

    const instagramMedia = await fetchInstagramMedia();
    
    // Filter to only include images and videos
    const posts = instagramMedia
      .filter(media => ['IMAGE', 'CAROUSEL_ALBUM', 'VIDEO'].includes(media.media_type))
      .map(media => ({
        id: media.id,
        imageUrl: media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url,
        caption: media.caption || '',
        permalink: media.permalink,
        timestamp: media.timestamp,
        username: media.username,
      }));

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('Instagram API route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

/**
 * Mock Instagram posts for development
 */
function getMockInstagramPosts() {
  return [
    {
      id: '1',
      imageUrl: 'https://placedog.net/640/640?id=20',
      caption: 'Taking care of this sweet puppy for the weekend! #petsitting #dogwalker',
      permalink: 'https://www.instagram.com/p/mock-post-1/',
      timestamp: '2023-04-15T12:30:00+0000',
      username: 'porzeczka_petsitter'
    },
    {
      id: '2',
      imageUrl: 'https://placedog.net/640/640?id=21',
      caption: 'Morning walks are the best part of the day! 🐕 #morningwalk #happydog',
      permalink: 'https://www.instagram.com/p/mock-post-2/',
      timestamp: '2023-04-10T08:15:00+0000',
      username: 'porzeczka_petsitter'
    },
    {
      id: '3',
      imageUrl: 'https://placedog.net/640/640?id=22',
      caption: 'Made a new friend today! Meet Max, the most energetic Golden Retriever ever 💙 #goldenretriever #dogsofinstagram',
      permalink: 'https://www.instagram.com/p/mock-post-3/',
      timestamp: '2023-04-05T15:45:00+0000',
      username: 'porzeczka_petsitter'
    },
    {
      id: '4',
      imageUrl: 'https://placedog.net/640/640?id=23',
      caption: 'Enjoying some playtime at the park 🌳 #dogpark #funtime',
      permalink: 'https://www.instagram.com/p/mock-post-4/',
      timestamp: '2023-04-01T14:20:00+0000',
      username: 'porzeczka_petsitter'
    },
    {
      id: '5',
      imageUrl: 'https://placedog.net/640/640?id=24',
      caption: 'Cuddle time with this sweet kitty 😺 #catsitting #petsitter',
      permalink: 'https://www.instagram.com/p/mock-post-5/',
      timestamp: '2023-03-25T17:30:00+0000',
      username: 'porzeczka_petsitter'
    },
    {
      id: '6',
      imageUrl: 'https://placedog.net/640/640?id=25',
      caption: 'Taking care of this little bundle of joy while their humans are away ❤️ #petsitter #dogsofinstagram',
      permalink: 'https://www.instagram.com/p/mock-post-6/',
      timestamp: '2023-03-20T09:10:00+0000',
      username: 'porzeczka_petsitter'
    }
  ];
} 