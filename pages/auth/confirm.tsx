import Loading from "@/components/ui/Loading";
import { MainWrapper } from "@/styles/wrappers";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isValid } from "@/helpers/api/status";

type LineLoginError = {
  error: string;
  error_description: string;
};

type Props = {
  isSuccess: boolean;
  error?: LineLoginError;
  code?: string;
  fullQuery?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  resolvedUrl,
}) => {
  // 檢查是否有錯誤
  if (query.error) {
    return {
      props: {
        isSuccess: false,
        error: {
          error: query.error as string,
          error_description: (query.error_description as string) || "未知錯誤",
        },
      },
    };
  }

  // 檢查必要參數
  if (!query.code || !query.state) {
    return {
      props: {
        isSuccess: false,
        error: {
          error: "invalid_request",
          error_description: "缺少必要參數",
        },
      },
    };
  }

  // 驗證 state 參數（防止 CSRF 攻擊）
  const expectedState = "12345abcde";
  if (query.state !== expectedState) {
    return {
      props: {
        isSuccess: false,
        error: {
          error: "invalid_state",
          error_description: "無效的 state 參數",
        },
      },
    };
  }

  // 取得 query string
  const queryIndex = resolvedUrl.indexOf("?");
  const fullQuery = queryIndex !== -1 ? resolvedUrl.slice(queryIndex) : "";

  // 成功取得授權碼
  return {
    props: {
      isSuccess: true,
      code: query.code as string,
      fullQuery,
    },
  };
};

const ConfirmPage = ({ isSuccess, error, code, fullQuery }: Props) => {
  const router = useRouter();

  console.log("ConfirmPage", isSuccess, error, code, fullQuery);

  useEffect(() => {
    // if (!isSuccess) {
    //   setTimeout(() => {
    //     router.push("/auth/signin");
    //   }, 3000);
    //   return;
    // }

    const getAccessToken = async () => {
      const response = await fetch("/api/getLineCallback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryString: fullQuery }),
      });

      const result = await response.json();

      if (isValid(result)) {
        router.push("/user/profile");
      } else {
        alert(`${result.error}, ${result.message}`);
        router.push("/auth/signin");
      }
    };

    getAccessToken();
  }, [isSuccess, error, code, fullQuery, router]);

  return (
    <>
      <Head>
        <title>{isSuccess ? "登入中" : "登入失敗"}</title>
        <meta name="description" content={isSuccess ? "登入中" : "登入失敗"} />
      </Head>
      <MainWrapper>
        {isSuccess ? (
          <Loading />
        ) : (
          <div>
            <h1>登入失敗</h1>
            <p>{error?.error_description}</p>
            <p>即將返回登入頁面...</p>
          </div>
        )}
      </MainWrapper>
    </>
  );
};

export default ConfirmPage;
