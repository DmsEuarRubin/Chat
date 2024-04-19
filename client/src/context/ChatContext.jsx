import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { io } from "socket.io-client"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMassage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);


    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?.id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        });

        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket])

    useEffect(() => {
        if (socket === null) return;

        const recipentId = currentChat?.members?.find((id) => id != user?.id);

        socket.emit("sendMessage", { ...newMassage, recipentId })
    }, [newMassage])

    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            if (currentChat?.id != res?.chatId) return;

            setMessages((prev) => [...prev, res])
        });

        return () => {
            socket.off("getMessage")
        }
    }, [socket, currentChat])

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) {
                return console.log("Error fetching users", response);
            }

            const pChats = response?.filter((u) => {
                let isChatCreated = false;

                if (user?.id == u.id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat?.members[0] == u?.id || chat?.members[1] == u?.id;
                    })
                }

                return !isChatCreated;
            })
            setPotentialChats(pChats)
        }
        getUsers()
    }, [userChats])
    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chat/${user?.id}`)
                setIsUserChatsLoading(false)

                if (response.error) {
                    return setUserChatsError(response)
                }

                setUserChats(response)
            }
        }
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true)
            setMessagesError(null)

            const response = await getRequest(`${baseUrl}/messages/${currentChat?.id}`)
            setIsMessagesLoading(false)

            if (response.error) {
                return setMessagesError(response)
            }

            setMessages(response)
        }
        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must type something...");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender.id,
            text: textMessage
        }))

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chat`, JSON.stringify({
            firstId, secondId
        }))

        if (response.error)
            return console.log("Error creating chat", response)

        setUserChats((prev) => [...prev, response])
    }, [])

    return <ChatContext.Provider value={{
        userChats,
        isUserChatLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers
    }}>{children}</ChatContext.Provider>
} 