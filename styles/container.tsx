import styled from "styled-components";

export const breakpoints = {
  sm: 576,
  md: 768,
  l: 1024,
  xl: 1344,
};

export const ExtraLarge = `(min-width: ${breakpoints.xl}px)`;
export const Desktop = `(min-width: ${breakpoints.l}px)`;
export const Tablet = `(min-width: ${breakpoints.md}px)`;
export const Mobile = `(min-width: ${breakpoints.sm}px)`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;

  @media ${Tablet} {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media ${Desktop} {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: ${breakpoints.xl + 24}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Container1344 = styled(Container)`
  max-width: 1344px;
`;

export const Container1164 = styled(Container)`
  max-width: 1164px;
`;

export const Container1116 = styled(Container)`
  max-width: 1116px;
`;

export const Container1021 = styled(Container)`
  max-width: 1021px;
`;

export const Container912 = styled(Container)`
  max-width: 912px;
`;

export const Container432 = styled(Container)`
  max-width: 432px;
`;
