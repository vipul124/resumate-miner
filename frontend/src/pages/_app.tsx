import "@/app/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
          <title>ResuMate</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </div>

      <div className="container">
        <Component {...pageProps} />
      </div>
    </>

  );
}

export default App;
