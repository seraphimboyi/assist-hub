import { RoundedFull } from "@/styles/borderRadius";
import styled from "styled-components";

export const AvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
  ${RoundedFull};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey200};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;
