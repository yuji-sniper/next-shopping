import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../context/AppContext";

interface Props {
    children?: JSX.Element
}

const Layout = (props: Props) => {
    const {user, setUser} = useContext(AppContext)

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
                            <Link href="/login">
                                <a className="navbar-brand">ログアウト</a>
                            </Link>
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