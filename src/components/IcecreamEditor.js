import { useState } from "react";
import FLAVORS from "../constants/FLAVORS";
import Cone from "./Cone";
import Scoop from './Scoop'
import Sprinkles from "./Sprinkles";
import cherry from '../assets/cherry.svg'
import wafer from '../assets/wafer.svg'
import WAFERS from "../constants/WAFERS";
import randomRange from "../utils/randomRange";
import { useEffect } from "react";

const IcecreamEditor = ({ presetIcecream }) => {
  const [chocolateConfig, setChocolateConfig] = useState({
    scoops: [
      FLAVORS.Vanilla,
      FLAVORS.Strawberry,
      FLAVORS.Mint,
    ],
    toppings: [
      <Sprinkles key="sprinkles" />
    ],
    addCherry: true,
    wafers: [
      WAFERS.stick,
      WAFERS.stick,
    ],
  });

  useEffect(() => {
    if (presetIcecream !== undefined) {
      const scoops = [],
        toppings = [];
      let wafers = [];
      let addCherry = false;

      presetIcecream.scoops.forEach(({ icecream_flavour: flavour }) => {
        scoops.push(FLAVORS[flavour.flavour])
      })

      presetIcecream.toppings.forEach(({ name }) => {
        if (name === 'Cherry') {
          addCherry = true;
        } else if (name === 'Wafer') {
          wafers = [
            WAFERS.stick,
            WAFERS.stick,
          ]
        }
      })

      setChocolateConfig({
        scoops,
        wafers,
        addCherry,
        toppings
      });

    }
  }, [presetIcecream]);

  return <div className="App flex items-center justify-center ">
    <div className="m-auto flex flex-col items-center">
      <div className="flex h-56 w-full flex-col-reverse items-center relative">
        {
          chocolateConfig.wafers.map((item, index) => (
            <img key={index} style={{
              width: 25,
              position: 'absolute',
              zIndex: 3 + index,
              top: (-10 + index * 10) + '%',
              left: `${15 + index * 50}%`,
              transform: `rotateZ(${(index % 2 === 0 ? '-' : '') + randomRange(15, 30)}deg)`,
            }} src={wafer} alt='wafer' />
          ))
        }
        {chocolateConfig.scoops.map((flavour, index) => (
          <Scoop key={flavour.primary} flavour={flavour} scoopIndex={index}>
            {
              (chocolateConfig.addCherry && index === 0) && (
                <img key="cherry" className="w-10 z-50 absolute transform -translate-x-1/2 left-1/2 -top-8" src={cherry} alt='cherry' />
              )
            }
            <div className="w-full h-40 relative overflow-hidden rounded-full">
              {chocolateConfig.toppings.map((topping) => {
                return topping;
              })}
            </div>
          </Scoop>
        ))}
      </div>
      <Cone />
    </div>
  </div>;
}

export default IcecreamEditor;
