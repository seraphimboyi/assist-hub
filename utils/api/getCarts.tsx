import { Result } from "@/types/checkout";
import { Error } from "@/types/apiRoutes";
import { catchError } from "@/utils/handleErrors";
import { NODE_ENV } from "@/constants/environment";
import { validateResponseType } from "@/utils/typeGuards";
import { ResultGetCarts, ResultGetCartsType } from "@/types/getCarts";
import { get_carts } from "@/constants/apiPath";

export const getCarts = async (
  token: string,
): Promise<Result<ResultGetCartsType["data"]>> => {
  const parsedUrl = new URL(get_carts);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const [res, error] = await catchError(fetch(parsedUrl, options));

  console.log("res", res);

  if (error) {
    console.log("error", error);

    const unexpectedError: Error = {
      code: 500,
      message: `發生未知錯誤: ${error.message}`,
    };

    return {
      statusCode: 500,
      status: false,
      message: unexpectedError.message,
      data: undefined,
      error: unexpectedError,
    };
  }

  const json = await res.json();

  if (NODE_ENV === "development") {
    const validation = validateResponseType(json, ResultGetCarts);

    !validation.isValid &&
      console.error("API Response validation failed:", validation.errors);
  }

  console.log("json", json);

  return {
    statusCode: json.statusCode,
    status: json.status,
    message: json.message,
    data: json.data,
    error: null,
  };
};

export default getCarts;
