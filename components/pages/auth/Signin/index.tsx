import { useState, Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/slices/user";
import { LoaderSpinner } from "@/components/ui/LoaderSpinner";
import FormField from "@/utils/react-hook-form/FloatingLabel";
import { RegisterField } from "@/utils/react-hook-form/types";
import { registerFields, SignInInputs } from "./data";
import { InfoLink, UnderlineLink } from "@/styles/link";
import { IconWrapper } from "@/utils/react-icons/iconWrappers";
import { FaLine } from "react-icons/fa";
import { useTheme } from "styled-components";
import CheckboxField from "@/utils/react-hook-form/CheckboxField";
import {
  Container,
  Title,
  Form,
  FooterLinks,
  Button,
  LineLoginButton,
} from "../Layout/styled";
import { Remember } from "./styled";
import { ErrorMessage } from "@/utils/react-hook-form/FormError/styled";
import { BASE_URL } from "@/constants/environment";
import { hasError, isEmptyData } from "@/helpers/api/status";
import { default_redirect, routes } from "@/constants/routes";

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<SignInInputs>({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const { remember, ...signinData } = data;

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinData),
    });

    const result = await res.json();

    if (hasError(result)) {
      setError("root.serverError", {
        type: result.statusCode.toString(),
        message: result.message || "伺服器錯誤，請稍後再試",
      });
      console.log("hasError", result.error);
      return;
    }

    const redirectPath = result.data?.IsAdmin
      ? default_redirect.admin
      : default_redirect.user;

    switch (result.statusCode) {
      case 200:
        !isEmptyData(result) && dispatch(setUser(result.data));
        window.location.href = redirectPath;
        break;
      case 404:
        setError("email", { type: "manual", message: "帳號或密碼錯誤" });
        break;
      case 400:
        setError("password", { type: "manual", message: "密碼格式錯誤" });
        break;
      case 403:
        setError("password", { type: "manual", message: "帳號或密碼錯誤" });
        break;
      default:
        setError("root.serverError", {
          type: result.statusCode.toString(),
          message: "系統發生未預期的錯誤，請刷新整理頁面後再嘗試",
        });
        break;
    }
  };

  return (
    <Container>
      <Title>登入</Title>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {registerFields.map((field: RegisterField<SignInInputs>) => (
          <Fragment key={field.name}>
            <FormField
              field={field}
              register={register}
              errors={errors}
              dirtyFields={dirtyFields}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </Fragment>
        ))}
        <Remember>
          <CheckboxField<SignInInputs>
            id="remember"
            control={control}
            field={{ name: "remember" }}
            $gap={8}
            $fontSize={16}
            $checkedColor="textMuted"
            $uncheckedColor="textMuted"
            $color="textMuted"
            label="記住我"
          />
          <InfoLink href="#">忘記密碼</InfoLink>
        </Remember>
        {errors.root?.serverError && (
          <ErrorMessage $margin="4px">
            {errors.root.serverError.message || "系統錯誤，請稍後再試"}
          </ErrorMessage>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length !== 0}
        >
          {isSubmitting ? <LoaderSpinner $color="white" /> : "登入"}
        </Button>
        <LineLoginButton
          href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2006800464&redirect_uri=${BASE_URL}/auth/confirm&state=12345abcde&scope=profile%20openid%20email&nonce=09876xyz`}
        >
          <IconWrapper $size={31} $backgroundColor="white" $borderRadius={5}>
            <FaLine size={31} fill={theme.colors.lineLogo} />
          </IconWrapper>
          Line 登入
        </LineLoginButton>
        <FooterLinks>
          還沒有帳號嗎？
          <UnderlineLink href={routes.auth.register}>立即註冊</UnderlineLink>
        </FooterLinks>
      </Form>
    </Container>
  );
};

export default Signin;
