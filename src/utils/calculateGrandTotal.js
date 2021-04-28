const calculateGrandTotal = (presetIcecreams) => {
  let total = 0;
  presetIcecreams.forEach(({ scoops, toppings, count }, index) => {
    let currentTotal = 0
    scoops.forEach(({ icecream_flavour: scoop }) => {
      currentTotal += scoop.price;
    })
    toppings.forEach(({ price }) => {
      currentTotal += price;
    })
    total += (currentTotal * count)
  })

  return total;
}

export default calculateGrandTotal;
