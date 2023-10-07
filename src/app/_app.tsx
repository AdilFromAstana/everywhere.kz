import { AppProps } from 'next/app'; // Import the AppProps type

function MyApp({ Component, pageProps }: AppProps) {
  // Explicitly type the Component prop
  return <Component {...pageProps} />;
}

export default MyApp;
