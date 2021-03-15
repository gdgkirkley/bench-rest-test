import styled from "styled-components";

export const TableStyled = styled.div`
  background: white;
  border-radius: 0.2rem;
  box-shadow: var(--shadow);
`;

export const TableRowStyled = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  grid-gap: 1.5rem;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid var(--grey3);
  color: var(--grey2);

  &:hover {
    color: var(--primary2);
    font-weight: 500;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 4fr 5.5fr 1fr;
    padding: 0.8rem 2rem;
  }
`;

// TODO add better responsive table styling
// Ideally this would display the data labels next to the data in mobile
export const TableCellStyled = styled.span`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[role="columnheader"] {
    color: var(--primary2);
    font-weight: 700;
    font-size: 1rem;
  }
`;
