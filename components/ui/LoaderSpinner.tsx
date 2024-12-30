import { RoundedFull } from "@/styles/borderRadius";
import styled from "styled-components";

const LoaderSpinner = styled.div`
  height: 22.5px;
  width: 22.5px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  ${RoundedFull};
  border-top: none;
  border-right: none;
  margin: 0 auto;
  animation: spin 1s ease-in-out infinite;
`;

export { LoaderSpinner };
