import React from "react";
import { Container, Title } from "./styled";

const Empty = () => {
  return (
    <Container>
      <img src="/images/EmptyOrder.svg" alt="" width={280} height={280} />
      <Title>尚未有任何訂單</Title>
    </Container>
  );
};

export default Empty;
