import { useFetchRecipentUser } from "../../hooks/useFetchRecipent";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.jpg"

const UserChat = ({ chat, user }) => {
    const { recipentUser } = useFetchRecipentUser(chat, user)


    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between">
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height="35px"/>
                </div>
                <div className="text-content">
                    <div className="name">{recipentUser?.name}</div>
                    <div className="text">Text Message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12/12/2022</div>
                <div className="this-user-notifications">5</div>
                <span className="user-online"></span>
            </div>
        </Stack>
    );
}

export default UserChat;