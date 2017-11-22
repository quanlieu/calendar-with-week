import styled from 'styled-components';

const Cell = styled.div`
  padding: 0.2em;
  width: 2em;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
`;

const DateOfMonth = Cell.extend`
  background-color: ${props => (props.today ? 'red' : 'transparent')};
  border-radius: ${props => (props.today ? '50%' : '0')};
  color: ${props => (props.today ? 'white' : 'inherit')};
`;

const DayName = Cell.extend`
  background: #d3d3d3;
`;

export { Cell, DateOfMonth, DayName };
