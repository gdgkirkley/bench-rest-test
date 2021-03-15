import styled from "styled-components";

export const TableStyled = styled.div`
  background: white;
  border-radius: 0.2rem;
  box-shadow: var(--shadow);
`;

export const TableRowStyled = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4fr 5.5fr 1fr;
  padding: 0.8rem 2rem;
  border-bottom: 1px solid var(--grey3);
  color: var(--grey2);

  &:hover {
    color: var(--primary2);
    font-weight: 500;
  }
`;

export const TableCellStyled = styled.span`
  &[role="columnheader"] {
    color: var(--primary2);
    font-weight: 600;
    font-size: 1rem;
  }
`;
