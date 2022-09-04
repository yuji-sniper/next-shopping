import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AppContext from "../context/AppContext";
import { loginUser } from "../lib/auth";

const Login = () => {
    const router = useRouter()
    const appContext = useContext(AppContext)
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    })

    const handleLogin = async () => {
        const response = await loginUser(formData)
        appContext.setUser!(response?.data.user)
        router.push('/')
    }

    return (
        <Container className="register-container">
            <Row>
                <Col>
                    <div className="paper">
                        <div className="header">
                            <h2>ログイン</h2>
                        </div>
                    </div>
                    <section className="wrapper">
                        <Form>
                            <fieldset>
                                <FormGroup>
                                    <Label>
                                        メールアドレス：
                                    </Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        style={{ height: 50, fontSize: "1.2rem" }}
                                        onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        パスワード：
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        style={{ height: 50, fontSize: "1.2rem" }}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </FormGroup>
                                <span>
                                    <a href="">
                                        <small>パスワードをお忘れですか？</small>
                                    </a>
                                </span>
                                <Button
                                    style={{ float: "right", width: 120 }}
                                    color="primary"
                                    onClick={() => {handleLogin()}}
                                >
                                    ログイン
                                </Button>
                            </fieldset>
                        </Form>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;