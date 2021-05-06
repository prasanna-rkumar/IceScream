import { gql } from '@apollo/client';

const iceCreamsByIds = gql`
  query IceCreamsByIds($ids: [ID!]) {
    presetIcecreams(where:{id_in:$ids}) {
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

export default iceCreamsByIds;
