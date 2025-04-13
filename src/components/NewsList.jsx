//npm install axios react-bootstrap bootstrap - install
//npm install swiper

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

// lấy dữ liệu từ API tự tạo
const NewsList = () => {
  const [news, setNews] = useState([]);
  const apiURL = "https://67d3d6cb8bca322cc26b3c5d.mockapi.io/news";

  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4 text-center">Tin Tức Mới Nhất</h2>
      <Row>
        {news.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <small className="text-muted">
                  Ngày đăng: {item.date} | Lượt xem: {item.views}
                </small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsList;
