import React, { useState } from "react";
import {
  Item,
  Header,
  Major,
  Type,
  Info,
  Id,
  Created,
  Total,
  Main,
  Finished,
  Status,
  Table,
  Thead,
  Tr,
  RentHeader,
  OthersHeader,
  NameHeader,
  Tbody,
  Description,
  Product,
  Name,
  Feature,
  DetailsBtn,
  BtnContainer,
  QuantityrHeader,
  Quantity,
  Rent,
  Others,
  Col,
  ColGroup,
  TableContainer,
} from "./styled";
import { formatDate, adjustDate } from "./data";
import { formatCurrency } from "@/helpers/format/currency";
import { ResultGetMemberOrders } from "@/types/getOrders";
import Loading from "@/components/ui/Loading";

type ListProps = {
  order: (typeof ResultGetMemberOrders.data)[number];
  onViewDetails: () => void;
};

const ListItem: React.FC<ListProps> = ({ order, onViewDetails }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    orderId,
    orderStatus,
    shippingStatus,
    orderCode,
    createdDate,
    createdStamp,
    shipping,
    details: {
      quantity,
      productName,
      productDes,
      productImgSrc,
      productImgAlt,
      rent,
      deposit,
      fee,
      finalAmount,
      rentDate,
      rentStamp,
      returnDate,
      returnStamp,
    },
  } = order;

  const shippingFee = shipping === "delivery" ? fee : 0;
  const totalAmount = quantity * (rent + deposit) + shippingFee;

  const handleViewDetails = () => {
    setIsLoading(true);
    onViewDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Item>
      <Header
        $shipping={
          shipping === "delivery" || shipping === "store" ? shipping : "store"
        }
      >
        <Major>
          <Type>
            {order.shipping === "delivery"
              ? "宅配"
              : order.shipping === "store"
                ? "自取"
                : "未知方式"}
          </Type>
          <Info>
            <Id>訂單編號 {orderCode}</Id>
            <Created>訂單時間 {formatDate(createdDate)}</Created>
          </Info>
        </Major>
        <Total>{formatCurrency(totalAmount)}</Total>
      </Header>
      <Main>
        {shipping === "delivery" ? (
          <Finished>預計抵達日期 {adjustDate(rentStamp)}</Finished>
        ) : shipping === "store" ? (
          <Finished>取件驗證碼: {orderCode}</Finished>
        ) : (
          <Finished>N/A</Finished>
        )}
        <Status $status={order.orderStatus}>{order.orderStatus}</Status>
      </Main>
      <TableContainer>
        <Table>
          <ColGroup>
            <Col style={{ width: "40%" }} />
            <Col style={{ width: "15%" }} />
            <Col style={{ width: "15%" }} />
            <Col style={{ width: "15%" }} />
            <Col style={{ width: "15%" }} />
          </ColGroup>
          <Thead>
            <Tr>
              <NameHeader>輔具名稱</NameHeader>
              <QuantityrHeader>數量</QuantityrHeader>
              <RentHeader>租金</RentHeader>
              <OthersHeader>其他費用</OthersHeader>
              <th></th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Product>
                <img
                  src={productImgSrc}
                  width={66}
                  height={66}
                  alt={productImgAlt}
                />
                <Description>
                  <Name>{productName}</Name>
                  <Feature>{productDes}</Feature>
                </Description>
              </Product>
              <Quantity>x{quantity}</Quantity>
              <Rent>{formatCurrency(rent)}</Rent>
              <Others>{formatCurrency(deposit)}</Others>
              <BtnContainer>
                {isLoading ? (
                  <Loading />
                ) : (
                  <DetailsBtn onClick={handleViewDetails}>查看訂單</DetailsBtn>
                )}
              </BtnContainer>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Item>
  );
};

export default ListItem;
