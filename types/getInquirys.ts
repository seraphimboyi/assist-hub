import { Error } from "@/types/apiRoutes";

export const ResultGetInquirys = {
  statusCode: 0,
  status: true,
  message: "",
  data: [
    {
      "inquiryId": 15,
      "inquiryCode": "AA016",
      "createdDate": "2025-01-20T01:05:18.017",
      "createdStamp": "2025-01-20",
      "isReplied": false,
      "images": [
        {
          "src": "http://52.172.145.130:8080/picture/wheelChair/wheelChair-1.jpg",
          "alt": "【樂輕行】輕便折疊輪椅"
        },
        {
          "src": "http://52.172.145.130:8080/picture/wheelChair/wheelChair-2.jpg",
          "alt": "【倍舒適】加寬輪椅"
        },
        {
          "src": "http://52.172.145.130:8080/picture/wheelChair/wheelChair-3.jpg",
          "alt": "【省心】經濟型輪椅"
        }
      ],
      "suggetsId": 14,
      "suggetsCode": "AA016S"
    },
  ],
};

export type ResultGetInquirysType = {
  statusCode: number;
  status: boolean;
  message: string;
  data: typeof ResultGetInquirys.data | undefined;
  error: Error | null;
};