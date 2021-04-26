import styled, { css } from "styled-components";
import SPRINKLE_COLORS from "../constants/SPRINKLE_COLORS";
import randomRange from "../utils/randomRange";

const Sprinkles = () => {
  let sprinkles = [];
  for (let i = 0; i < 5 ; i++) {
    sprinkles.push(
      <Sprinkle key={i} i={i} />
    );
  }
  return sprinkles;
}

export default Sprinkles;

const appendPercentage = (value) => value + '%';

const appendDegree = (value) => value + 'deg';

const Sprinkle = styled.div`
  position: absolute;
  width : 5px;
  height: 1px;
  border-radius: 20px;
  ${props => props.i !== undefined && css`
    background-color: ${SPRINKLE_COLORS[randomRange(0, 2)]};
    top: ${appendPercentage(randomRange(0, 75))};
    left: ${appendPercentage(randomRange(0, 100))};
    transform: rotateZ(${appendDegree(randomRange(0, 180))});
  `}
`;


