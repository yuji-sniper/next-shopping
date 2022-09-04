import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Cart from "../../components/Cart";

interface Dish {
    id: number
    name: string
    description: string
    price: number
    image: {
        url: string
    }
}

interface QueryData {
    restaurant: {
        id: number
        name: string
        dishes: Dish[]
    }
}

const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }
`

const RestaurantsShow = () => {
    const router = useRouter();

    const { loading, error, data } = useQuery<QueryData>(GET_RESTAURANT_DISHES, {
        variables: { id: router.query.id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!</p>

    return (
        <>
            <h1>{data?.restaurant.name}</h1>
            <Row>
                {data?.restaurant.dishes.map((dish: Dish) => (
                    <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
                        <Card style={{ margin: "0 10px" }}>
                            <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`} top={true} style={{ height: 250 }} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardTitle>{dish.description}</CardTitle>
                            </CardBody>
                            <div className="card-footer">
                                <Button outline color="primary">
                                    + カートに入れる
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
                <Col xs="3" style={{ padding: 0 }}>
                    <div>
                        <Cart/>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default RestaurantsShow;