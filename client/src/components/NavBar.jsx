import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return <Navbar bg="dark" className="mb-4" style={{ height: "3.75" }}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">ChatSystem</Link>
            </h2>
            {
                user &&  <span className="text-info">{user?.name}, I'm glad to see you again</span>
            }
            <Nav>
                <Stack direction="horizontal" gap={2}>
                    {
                        user && (<>
                            <Link onClick={() => logoutUser()} to="/login" className="link-light text-decoration-none">Logout</Link>
                        </>)
                    }
                    {
                        !user && (<>
                            <Link to="/login" className="link-light text-decoration-none">Login</Link>
                            <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </>)
                    }
                </Stack>
            </Nav>
        </Container>
    </Navbar>;
}

export default NavBar;