import styled, { css } from 'styled-components'

const deviationX = 20;
const deviationY = -25;

const intToPixels = (size) => size + 'px';

const calcX = (scoopIndex) => {
  let x;
  x = deviationX + ((scoopIndex - 1) * 15);
  if (scoopIndex % 2 === 0) {
    x = -x;
  }
  return intToPixels(x);
}

const calcY = (scoopIndex) => {
  return intToPixels(deviationY - (scoopIndex * 10));
}


const Scoop = styled.div(({ flavour, scoopIndex }) => {
  return css`
    background-color: ${flavour.primary};    
    border: 6px solid ${flavour.secondary};
    border-bottom-color: transparent;
    width: 160px;
    height: 160px;
    border-radius: 100%;
    position: absolute;
    z-index: ${4 - scoopIndex};
    ${scoopIndex > 0 && css`
        transform: translateX(${calcX(scoopIndex)}) translateY(${calcY(scoopIndex)}) rotateZ(${(scoopIndex % 2 === 0 ? -35 : 35) + 'deg'});
      `
    }
    ${scoopIndex === 0 && css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: -5px;
        height: 48px;
        background: ${flavour.primary};
        width: 160px;
        border-radius: 100%;
        z-index: ${4 - scoopIndex + 1};
      }
    `}
    
  `;
});

export default Scoop;
