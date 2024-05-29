import { v4 as uuidv4 } from "uuid";
import { ChatManager } from "../core/chatManager";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const chatsStore = (set, get) => ({
  chats: {
    activeChat: {
      msg: "",
      id: "",
      title: "",
      history: [],
      isLoading: true,
      shouldFetch: true,
    },
    isLoading: true,
    history: [],
    activeId: "",
    generating: false,
    chatManager: new ChatManager(),

    setMessage: (msg) => {
      set((state) => {
        state.chats.activeChat.msg = msg;
      });
    },

    async sendMessage(msg, chatId) {
      const activeId = get().chats.activeId;
      const isNewChat = !activeId;

      const msgId = uuidv4();
      const replyId = uuidv4();

      if (isNewChat) {
        // set as active chat
        // set activeId
        // add msg to chat messages history
        // start getting reply
        // generate title with query and ans and then push to recent history
        set((state) => {
          state.chats.activeId = chatId;
          state.chats.activeChat = {
            msg: "",
            id: chatId,
            title: "Untitled Chat",
            history: [
              {
                id: msgId,
                role: "user",
                done: true,
                content: msg,
              },
              {
                id: replyId,
                role: "assistant",
                done: false,
                content: "",
              },
            ],
            isLoading: false,
            shouldFetch: false,
          };
          state.chats.generating = true;
        });

        await get().chats.getReply(msg, replyId);
      } else {
        // add msg to active chat messages history
        // start getting reply
        set((state) => {
          state.chats.activeChat = {
            ...state.chats.activeChat,
            history: [
              ...state.chats.activeChat.history,
              {
                id: msgId,
                role: "user",
                done: true,
                content: msg,
              },
              {
                id: replyId,
                role: "assistant",
                done: false,
                content: "",
              },
            ],
            isLoading: false,
            shouldFetch: false,
          };
          state.chats.generating = true;
        });

        await get().chats.getReply(msg, replyId);
      }
    },

    async getReply(msg, replyId) {
      try {
        await fetchEventSource("http://localhost:8080/api/generate", {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: msg,
          }),
          onopen(res) {
            if (res.ok && res.status === 200) {
              console.log("Connection made", res);
            } else if (
              res.status >= 400 &&
              res.status < 500 &&
              res.status !== 429
            ) {
              console.log("Client side error");
            }
          },

          onmessage(event) {
            // add to msg content
            set((state) => {
              state.chats.activeChat.history =
                state.chats.activeChat.history.map((msg) => {
                  if (msg.id === replyId) {
                    return {
                      ...msg,
                      content: msg.content + event.data,
                    };
                  }
                  return msg;
                });
            });
          },

          onclose() {
            // set msg as done
            // set generating false
            set((state) => {
              state.chats.generating = false;
              state.chats.activeChat.history =
                state.chats.activeChat.history.map((msg) => {
                  if (msg.id === replyId) {
                    return {
                      ...msg,
                      done: true,
                    };
                  }
                  return msg;
                });
            });
            console.log("Connection closed");
          },

          onerror(err) {
            console.log("There was an error from the server", err);
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    createNewChat() {},

    setActiveChat() {},

    fetchChats() {},

    fetchChatMessages() {},

    getTitleFromQueryAndResult() {},
  },
});

export { chatsStore };
