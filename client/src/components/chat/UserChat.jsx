import { useFetchRecipentUser } from "../../hooks/useFetchRecipent";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.jpg"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
    const { recipentUser } = useFetchRecipentUser(chat, user)
    const { onlineUsers } = useContext(ChatContext);


    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between">
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height="35px" />
                </div>
                <div className="text-content">
                    <div className="name">{recipentUser?.name}</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <span className={onlineUsers?.some((user) => user?.userId == recipentUser?.id) ? "user-online" : ""}></span>
            </div>
        </Stack >
    );
}

export default UserChat;