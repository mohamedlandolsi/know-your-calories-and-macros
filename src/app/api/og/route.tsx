import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get dynamic params or use defaults
    const title = searchParams.get('title') || 'Know Your Calories and Macros';
    const description = searchParams.get('description') || 'Calculate your daily calorie and macronutrient needs';
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom right, #4ADE80, #22D3EE)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            textAlign: 'center',
            padding: 40,
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M18 17V9"></path>
              <path d="M13 17V5"></path>
              <path d="M8 17v-3"></path>
            </svg>
            <div style={{ marginLeft: 16 }}>{title}</div>
          </div>
          <div
            style={{
              fontSize: 30,
              opacity: 0.9,
              marginTop: 12,
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
