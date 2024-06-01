import React from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { ChatPage } from "./pages/ChatPage";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage landing={true} />,
    },
    // {
    //   path: "/new/:id",
    //   element: <ChatPage />,
    // },
  ],
  { basename: "/local_chat" }
);

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
}

export { App };
