import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

interface Props {
    search: string
}

interface Restaurant {
    id: number
    name: string
    description: string
    image: {
        url: string
    }[]
}

interface QueryData {
    restaurants: Restaurant[]
}

const GET_RESTAURANTS = gql`
    {
        restaurants {
            id
            name
            description
            image {
                url
            }
        }
    }
`

const RestaurantList = (props: Props) => {
    const { loading, error, data } = useQuery<QueryData>(GET_RESTAURANTS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!</p>

    const filteredRestaurants = data?.restaurants.filter((restaurant: Restaurant) => 
        restaurant.name.toLowerCase().includes(props.search)
    )

    return (
        <Row>
            {filteredRestaurants?.map((restaurant: Restaurant) => (
                <Col xs="6" sm="4" key={restaurant.id}>
                    <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                        <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.image[0].url}`} top={true} style={{ height: 250 }} />
                        <CardBody>
                            <CardTitle>{restaurant.name}</CardTitle>
                            <CardTitle>{restaurant.description}</CardTitle>
                        </CardBody>
                        <div className="card-footer">
                            <Link
                                href={`/restaurants?id=${restaurant.id}`}
                                as={`/restaurants/${restaurant.id}`}>
                                <a className="btn btn-primary">もっと見る</a>
                            </Link>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default RestaurantList;