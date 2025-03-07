import { RegisterField } from "@/utils/react-hook-form/types";

export type SignInInputs = {
  [key: string]: string;
  email: string;
  password: string;
};

export const registerFields: RegisterField<SignInInputs>[] = [
  {
    name: "email",
    label: "帳號（您的電子信箱）",
    type: "text",
    validation: {
      required: "請填寫電子信箱",
      validate: {
        // RFC 5322 標準
        domain: (value: string) => {
          const beforeAtRegex =
            /@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return beforeAtRegex.test(value) || "請輸入有效的電子郵件域名";
        },
        local: (value: string) => {
          const beforeAtRegex =
            /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x01-\x09\x0b\x0c\x0e-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@/;
          return (
            beforeAtRegex.test(value) ||
            "電子郵件地址 '@' 前方不應包含空白或非法字符"
          );
        },
        length: (value: string) => {
          if (value.length > 254) return "電子信箱長度不得超過 254 個字符";
          const localPart = value.split("@")[0];
          if (localPart.length > 64) return "@ 前方不得超過 64 個字符";
          return true;
        },
      },
    },
    errorType: "default",
  },
  {
    name: "password",
    label: "密碼",
    type: "password",
    validation: {
      required: "請填寫密碼",
      validate: {
        notEmpty: (value: string) => {
          if (!value || value.trim() === "") {
            return "請正確填寫密碼";
          }
          return true;
        },
        // NIST SP 800-63B 標準
        length: (value: string) => {
          if (value.length > 64) return "密碼長度不得超過 64 個字符";
          return true;
        },
      },
    },
    errorType: "default",
  },
];
