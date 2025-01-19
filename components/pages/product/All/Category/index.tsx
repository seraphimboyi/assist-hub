import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToInquiryBar } from "@/utils/redux/slices/inquiryBar";
import { RootState } from "@/utils/redux/store";
import {
  Title,
  CardWrapper,
  Card,
  CardImg,
  Info,
  Name,
  Rent,
  CardBtn,
  InquiryIcon,
  CategoryContainer,
} from "./styled";
import { ProductItem } from "../data";

type ProductCategoryProps = {
  title: string;
  color: "primary" | "accent";
  bgColor: "primaryLight" | "accentLight";
  type: string;
  products: ProductItem[];
};

const Category: React.FC<ProductCategoryProps> = ({
  title,
  color,
  bgColor,
  type,
  products,
}) => {
  const dispatch = useDispatch();
  const inquiryBar = useSelector((state: RootState) => state.inquiryBar);

  const handleAddToInquiryBar = (product: ProductItem) => {
    if (inquiryBar.length >= 3) {
      alert("⚠️ 詢問單最多只能添加 3 個商品！");
      return;
    }
    const exists = inquiryBar.some((item) => item.id === product.id);
    if (exists) {
      alert("⚠️ 該商品已經在詢問單中！");
      return;
    }
    dispatch(
      addToInquiryBar({
        id: product.id,
        imgSrc: product.imgSrc,
        name: product.name,
        rent: product.rent,
      })
    );
    alert("✅ 商品成功加入詢問單！");
  };

  const filteredProducts = products.filter((product) => product.type === type);

  if (filteredProducts.length === 0) return null;

  return (
    <CategoryContainer>
      <Title $color={color}>{title}</Title>
      <CardWrapper>
        {filteredProducts.map((product) => (
          <Card $bg={bgColor} key={product.id}>
            <CardImg src={product.imgSrc} alt={product.imgAlt || product.name} />
            <Info>
              <Name>{product.name}</Name>
              <Rent>${product.rent}</Rent>
            </Info>
            <CardBtn onClick={() => handleAddToInquiryBar(product)}>
              <InquiryIcon />
              加入詢問單
            </CardBtn>
          </Card>
        ))}
      </CardWrapper>
    </CategoryContainer>
  );
};

export default Category;