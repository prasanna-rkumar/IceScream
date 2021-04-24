import styled, { css } from 'styled-components'

const deviationX = 20;
const deviationY = -35;

const intToPixels = (size) => size + 'px';

const calcX = (scoopIndex) => {
  let x;
  if (scoopIndex % 2 === 0) {
    x = -deviationX;
  } else {
    x = deviationX;
  }
  return intToPixels(x);
}

const calcY = (scoopIndex) => {
  return intToPixels(deviationY * scoopIndex);
}


const Scoop = styled.div(({ flavor, scoopIndex }) => {
  return css`
    background-color: ${flavor.primary};
    width: 160px;
    height: 160px;
    border-radius: 100%;
    position: absolute;
    overflow: hidden;
    z-index: ${4 - scoopIndex};
    ${scoopIndex > 0 && css`
        transform: translateX(${calcX(scoopIndex)}) translateY(${calcY(scoopIndex)}) rotateZ(${(scoopIndex % 2 === 0 ? -35 : 35) + 'deg'});
      `
    }
  `;
});

export default Scoop;
