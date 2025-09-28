// src/app/layout.tsx

import './globals.css'; // 전역 CSS 임포트

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Myparty App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}