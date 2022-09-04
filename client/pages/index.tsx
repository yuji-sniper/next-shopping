import { useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";

const Index = () => {
  const [query, setQuery] = useState('')

  return (
    <div className="container-fruid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText>探す</InputGroupText>
              <Input placeholder="レストラン名を入力" onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
    </div>
  );
}

export default Index;