import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

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

const Restaurants = () => {
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
            </Row>
        </>
    );
}

export default Restaurants;