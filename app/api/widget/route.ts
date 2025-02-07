import { NextResponse } from "next/server"

export async function GET() {
  const script = `
    (function() {
      const iframe = document.createElement('iframe');
      iframe.src = '${process.env.NEXT_PUBLIC_WEBSITE_URL}/widget';
      iframe.style.position = 'fixed';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
      iframe.style.width = '450px';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      document.body.appendChild(iframe);
    })();
  `

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  })
}

