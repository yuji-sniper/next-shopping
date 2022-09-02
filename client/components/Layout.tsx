import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";

interface Props {
    children?: JSX.Element
}

const Layout = (props: Props) => {
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
                        <Link href="/login">
                            <a className="navbar-brand">サインイン</a>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/register">
                            <a className="navbar-brand">サインアップ</a>
                        </Link>
                    </NavItem>
                </Nav>
            </header>
            <Container>{props.children}</Container>
        </div>
    );
}

export default Layout;