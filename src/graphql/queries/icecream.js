import { gql } from '@apollo/client';

const iceCream = gql`
  query IceCream ($id:ID){
    preset_Icecream (where:{id:$id}) {
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

export default iceCream;
