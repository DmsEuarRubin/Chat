import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatLoading, userChatsError } = useContext(ChatContext);
    
    return <Container>
        {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={4} className="align-items-start">
                <Stack className="messages-box flex-grow-0 pe-3">
                    {isUserChatLoading && <p>Loading chats...</p>}
                    {userChats?.map((chat, index) => {
                        return (
                            <div key={index}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        )
                    })}
                </Stack>
                <p>ChatBox</p>
            </Stack>
        )}
    </Container>;
}

export default Chat;