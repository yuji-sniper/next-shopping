import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../context/AppContext";

interface Props {
    children?: JSX.Element
}

const Layout = (props: Props) => {
    const router = useRouter()
    const {user, setUser} = useContext(AppContext)

    const handleLogout = () => {
        Cookies.remove('token')
        setUser!(null)
        router.push('/login')
    }

    return (
        <div>
            <Head>
                <title>フードデリバリーサービス</title>
            </Head>
            <header>
                <Nav className="navbar navbar-dark bg-dark">
                    <NavItem>
                        <Link href="/">
                            <a className="navbar-brand">ホーム</a>
                        </Link>
                    </NavItem>
                    <NavItem className="ml-auto">
                        {user ? (
                            <div className="navbar-brand"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleLogout()}
                            >
                                ログアウト
                            </div>
                        ) : (
                            <Link href="/login">
                                <a className="navbar-brand">ログイン</a>
                            </Link>
                        )}
                    </NavItem>
                    <NavItem>
                        {user ? (
                            <h5>{user.username}</h5>
                        ) : (
                            <Link href="/register">
                                <a className="navbar-brand">新規登録</a>
                            </Link>
                        )}
                    </NavItem>
                </Nav>
            </header>
            <Container>{props.children}</Container>
        </div>
    );
}

export default Layout;