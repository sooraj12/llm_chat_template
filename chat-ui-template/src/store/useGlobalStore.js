import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { chatsStore } from "./chats";

const useGlobalStore = create(
  devtools(
    immer((...utils) => ({
      ...chatsStore(...utils),
    }))
  )
);

export { useGlobalStore };
