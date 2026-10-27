# Threadbase - Live Chat with Socket.io (Starter)

Threadbase includes a real-time chat feature using Socket.io. Socket connections are
authenticated with JWT, and rooms scope each thread's messages so windows on the same
thread see each other's messages instantly.

## Setup

```bash
# Terminal 1 - the Express + Socket.io server
cd server && cp .env.example .env && npm install && npm start

# Terminal 2 - the React app
cd client && cp .env.development.example .env.development && npm install && npm run dev
```

The server and client dependencies include `socket.io` and `socket.io-client`.

## Implementation

The Express app is attached to an HTTP server shared with Socket.io. Socket connections
must present the login JWT; authenticated clients can join a room and broadcast messages
with their server-verified sender identity. The React `useSocket` hook manages the
connection lifecycle, room subscription, incoming messages, and cleanup.

`client/src/components/ChatRoom.jsx` uses the hook to render and send live messages.

## Testing your work

- Open the app, log in as **Ada**. Open a second browser window (or incognito), log in as **Linus**.
- Type in one window and press Send. The message should appear in **both** windows in well under a second.
- Log in credentials: `ada@threadbase.dev` / `password` and `linus@threadbase.dev` / `password`.

## What is already done

- The Express server with `/auth/login` (issues a JWT) and an HTTP `verifyToken` route.
- The React app: login page, auth context (holds the `token`), and `ChatRoom.jsx`.
