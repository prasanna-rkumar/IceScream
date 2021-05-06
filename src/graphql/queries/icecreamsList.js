import { gql } from '@apollo/client';

const iceCreamsList = gql`
  query IceCreams {
    presetIcecreams {
      id
      nickName
      scoops {
        icecream_flavour {
          id
          flavour
          price
        }
      }
      toppings {
        name
        price
      }
    }
  }
`;

export default iceCreamsList;
