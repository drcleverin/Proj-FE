


// // src/components/Chatting.tsx
// // Polyfill for 'global' object if absolutely necessary (though often not needed without SockJS)
// // Leaving it here as a fallback, but it might not be required with direct WebSocket.
// if (typeof window !== 'undefined') {
//     (window as any).global = window;
//   }

//   import React, { useState, useEffect, useRef } from 'react';
//   import { Client } from '@stomp/stompjs'; // No need for Stomp, Client is enough for modern usage
//   // import SockJS from 'sockjs-client'; // Removed this import

//   // Ensure Tailwind CSS is loaded or configured in your project
//   // If not, add this in your public/index.html or main CSS file:
//   // <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>

//   interface Message {
//     sender: string;
//     content: string;
//     timestamp: string;
//   }

//   const App: React.FC = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [messageInput, setMessageInput] = useState<string>('');
//     const [username, setUsername] = useState<string>('Guest');
//     const [isConnected, setIsConnected] = useState<boolean>(false);
//     const [stompClient, setStompClient] = useState<Client | null>(null);

//     const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling
//     // Direct WebSocket URL for Spring Boot. Note: No '/ws' endpoint specific for SockJS here.
//     // It's typically the base URL + endpoint, e.g., 'ws://localhost:8093/chat-websocket'
//     // Make sure this matches your Spring Boot endpoint (see backend change below).
//     const WS_URL = 'ws://localhost:8093/chat-websocket';

//     // Effect to establish WebSocket connection
//     useEffect(() => {
//       const client = new Client({
//         // Use native WebSocket directly
//         webSocketFactory: () => new WebSocket(WS_URL),
//         debug: (str) => {
//           // console.log(str); // Uncomment for STOMP client debugging
//         },
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000,
//       });

//       client.onConnect = (frame) => {
//         console.log('Connected: ' + frame);
//         setIsConnected(true);

//         // Subscribe to the public topic (where messages are broadcast)
//         client.subscribe('/topic/public', (message) => {
//           const receivedMessage: Message = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         });

//         /* You might also subscribe to a user-specific queue for private messages
//         client.subscribe(`/user/${username}/queue/messages`, (message) => {
//           const privateMessage: Message = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, privateMessage]);
//         }); */
//       };

//       client.onStompError = (frame) => {
//         console.error('Broker reported error: ' + frame.headers['message']);
//         console.error('Additional details: ' + frame.body);
//         setIsConnected(false);
//       };

//       client.onWebSocketClose = () => {
//         console.log('WebSocket connection closed.');
//         setIsConnected(false);
//       };

//       client.activate(); // Activate the STOMP client

//       setStompClient(client);

//       // Cleanup on component unmount
//       return () => {
//         if (client.connected) {
//           client.deactivate();
//         }
//       };
//     }, []); // Empty dependency array means this runs once on mount

//     // Effect to scroll to the bottom when new messages arrive
//     useEffect(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const sendMessage = (event: React.FormEvent) => {
//       event.preventDefault();
//       if (stompClient && stompClient.connected && messageInput.trim()) {
//         const chatMessage = {
//           sender: username,
//           content: messageInput.trim(),
//           timestamp: new Date().toISOString(),
//         };
//         // Publish message to the server's message endpoint
//         stompClient.publish({
//           destination: '/app/chat.sendMessage', // This maps to your Spring @MessageMapping
//           body: JSON.stringify(chatMessage),
//         });
//         setMessageInput('');
//       }
//     };

//     const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setUsername(event.target.value);
//       // If you implemented user-specific subscriptions, you might need to
//       // reconnect or re-subscribe here if the username changes while connected.
//     };

//     return (
//       <div className="flex flex-col h-screen bg-gray-100 font-inter p-4 sm:p-6 md:p-8">
//         {/* Connection Status */}
//         <div
//           className={`fixed top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow-md
//             ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
//         >
//           {isConnected ? 'Connected' : 'Disconnected'}
//         </div>

//         {/* Main Chat Container */}
//         <div className="flex flex-col flex-grow bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto w-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-xl shadow-md">
//             <h1 className="text-2xl font-bold">Insurance Chat</h1>
//             <div className="flex items-center space-x-2">
//               <label htmlFor="username" className="text-sm">Your Name:</label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={handleUsernameChange}
//                 className="p-2 rounded-lg bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-24 sm:w-32"
//                 placeholder="Enter name"
//               />
//             </div>
//           </div>

//           {/* Messages Display Area */}
//           <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50">
//             {messages.length === 0 ? (
//               <div className="text-center text-gray-500 py-10">
//                 No messages yet. Start chatting!
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm
//                       ${msg.sender === username
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                       }`}
//                   >
//                     <p className="font-semibold text-sm">{msg.sender}</p>
//                     <p className="text-base break-words">{msg.content}</p>
//                     <p className="text-xs text-right opacity-75 mt-1">
//                       {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} /> {/* For auto-scrolling */}
//           </div>

//           {/* Message Input Area */}
//           <form onSubmit={sendMessage} className="flex p-4 bg-gray-100 border-t border-gray-200">
//             <input
//               type="text"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               placeholder={isConnected ? "Type your message..." : "Connecting to chat..."}
//               disabled={!isConnected}
//               className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
//             />
//             <button
//               type="submit"
//               disabled={!isConnected || !messageInput.trim()}
//               className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
//             >
//               Send
//             </button>
//           </form>
//         </div>

//         {/* Dummy User List (for inspiration from original repo) */}
//         <div className="mt-8 max-w-4xl mx-auto w-full">
//           <h2 className="text-xl font-bold text-gray-800 mb-3">Online Users (Placeholder)</h2>
//           <div className="bg-white rounded-xl shadow-lg p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             <div className="flex items-center space-x-2 text-green-600 font-medium">
//               <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//               <span>Customer 1</span>
//             </div>
//             <div className="flex items-center space-x-2 text-green-600 font-medium">
//               <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//               <span>CSR John Doe</span>
//             </div>
//             <div className="flex items-center space-x-2 text-green-600 font-medium">
//               <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//               <span>Customer 2</span>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-500 font-medium">
//               <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
//               <span>CSR Jane Smith (Offline)</span>
//             </div>
//             {/* Add more dummy users as needed */}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default App;
// // 






















export const Chatting = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Chatting Component</h2>
        <p className="text-gray-600 text-center">This is a placeholder for the Chatting component.</p>
      </div>
    </div>
  );
}