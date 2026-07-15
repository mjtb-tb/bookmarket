import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <link rel="icon" href="/favicon1.png" /> */}
      {/* اگر فرمت عکست png است: */}
        <link rel="icon" type="image/png" href="/favicon1.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
