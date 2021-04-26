const calculateTotal = ({ scoops, toppings }) => {
  let total = 0;
  scoops.forEach(({ icecream_flavour: scoop }) => {
    total += scoop.price;
  })
  toppings.forEach(({ price }) => {
    total += price;
  })
  return total;
}

export default calculateTotal;
