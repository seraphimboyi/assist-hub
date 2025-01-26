import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Single from "@/components/pages/product/Single";
import { SinglePageProps } from "@/components/pages/product/Single/data";
import { MainWrapper } from "@/styles/wrappers";
import getProduct from "@/utils/api/getProduct";
import getProducts from "@/utils/api/getProducts";
import InquiryBar from "@/components/ui/InquiryBar";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const result = await getProducts();

    if (!result.status || !Array.isArray(result.data)) {
      console.error("Error fetching product data:", result.message);
      return { paths: [], fallback: "blocking" };
    }

    const paths = result.data.map((product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const result = await getProduct(Number(id));

    if (!result.status || !result.data || !result.data.product) {
      return { notFound: true };
    }

    const product = result.data.product;
    const comparison = result.data.comparison || [];
    const recommended = result.data.recommended || [];

    return {
      props: { product, comparison, recommended },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { notFound: true };
  }
};

const ProductPage: NextPage<SinglePageProps> = ({
  product,
  comparison,
  recommended,
}) => {
  return (
    <MainWrapper>
      <Head>
        <title>{product.name}</title>
        <meta
          name="description"
          content={`Discover more about ${product.name}`}
        />
      </Head>
      <Single
        product={product}
        comparison={comparison}
        recommended={recommended}
      />
      <InquiryBar />
    </MainWrapper>
  );
};

export default ProductPage;