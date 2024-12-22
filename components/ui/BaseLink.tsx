import Link from "next/link";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.info};
`;

export default LinkStyle;
