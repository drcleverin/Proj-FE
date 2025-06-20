// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);

// This polyfill explicitly defines 'global' in the window scope, which 'sockjs-client'
// sometimes expects in environments where 'global' is not natively defined (like browsers).
// This must be at the very top of your application's entry file to ensure it runs first.
if (typeof window !== 'undefined') {
    (window as any).global = window;
  }
  
  import { createRoot } from 'react-dom/client'
  import App from './App.tsx' // Assuming your main chat component is exported as 'App' from App.tsx
  import './index.css'
  
  // Get the root DOM element where the React app will be mounted.
  // The '!' non-null assertion is used here, assuming 'root' element always exists in index.html.
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(
      // Removed <React.StrictMode> temporarily for debugging this specific issue.
      // You can add it back once the 'global is not defined' error is resolved.
      <App />
    );
  } else {
    console.error('Root element with ID "root" not found in the document.');
  }
  