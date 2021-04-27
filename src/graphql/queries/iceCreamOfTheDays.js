import { gql } from '@apollo/client';

const iceCreamOfTheDays = gql`
  query IceCreamOfTheDays{
    icecreamOfTheDays{
      id
      preset_Icecream {
      id
      nickName
      scoops {
        icecream_flavour {
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
  }
`;

export default iceCreamOfTheDays;
