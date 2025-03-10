import {
  Container,
  Categories,
  AddressInfo,
  Contact,
  Copyright,
  Content,
  CategoryLink,
  Wrapper,
  Newsletter,
  SubscriptionField,
  SocialMediaLinks,
  Title,
  CategoryLinks,
  Image,
} from "./styled";
import CheckboxField from "@/utils/react-hook-form/CheckboxField";
import { useForm } from "react-hook-form";
import { ErrorMessage as FormErrorMessage } from "@/utils/react-hook-form/FormError/styled";
import InputField from "@/utils/react-hook-form/InputField";
import ForwardButton from "@/components/ui/buttons/ForwardButton";
import {
  FormValuesData,
  FormValuesProps,
} from "@/utils/react-hook-form/InputField/data";
import Link from "next/link";
import { footerInfo } from "@/components/pages/cart/Checkout/data";
import { LineIcon, MetaLogo } from "@/constants/imagePath";

const Footer: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesProps["newsletter"]>({
    defaultValues: {
      email: "",
      isSubscribed: false,
    },
  });

  const onSubmit = (data: FormValuesProps["newsletter"]) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Container>
        <Content>
          <Categories>
            <Title>輔具分類</Title>
            <CategoryLinks>
              <CategoryLink href="/product?type=wheelChair">
                行動輔椅
              </CategoryLink>
              <CategoryLink href="/product?type=oxygen">呼吸照護</CategoryLink>
              <CategoryLink href="/product?type=crutch">拐杖步行</CategoryLink>
              <CategoryLink href="/product?type=bed">臥室寢具</CategoryLink>
              <CategoryLink
                href="#"
                onClick={() => {
                  return false;
                }}
              >
                如廁沐浴
              </CategoryLink>
              <CategoryLink
                href="#"
                onClick={() => {
                  return false;
                }}
              >
                居家照護
              </CategoryLink>
              <CategoryLink
                href="#"
                onClick={() => {
                  return false;
                }}
              >
                輔具、護具
              </CategoryLink>
            </CategoryLinks>
          </Categories>
          <Contact>
            <Title>聯絡我們</Title>
            <AddressInfo>
              <span>營業時間：08:00-22:00</span>
              <span>電話：0912-345678</span>
              <span>地址：高雄市新興區</span>
              <SocialMediaLinks>
                <Link href="https://line.me" target="_blank">
                  <Image {...LineIcon} width={20} height={20} />
                </Link>
                <Link href="https://www.facebook.com/hexschool" target="_blank">
                  <Image {...MetaLogo} width={20} height={20} />
                </Link>
              </SocialMediaLinks>
            </AddressInfo>
          </Contact>
          <Newsletter>
            <Title>訂閱電子報</Title>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <SubscriptionField>
                <InputField<"newsletter">
                  {...FormValuesData.email}
                  register={register}
                  variant="default"
                />
                <ForwardButton />
                {errors.email && (
                  <FormErrorMessage $margin="4px">
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </SubscriptionField>
              <CheckboxField<FormValuesProps["newsletter"]>
                {...footerInfo}
                control={control}
              />
            </form>
          </Newsletter>
        </Content>

        <Copyright>Copyright ©2024</Copyright>
      </Container>
    </Wrapper>
  );
};

export default Footer;
