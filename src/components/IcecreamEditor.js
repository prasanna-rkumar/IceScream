import { useState } from "react";
import FLAVORS from "../constants/FLAVORS";
import Cone from "./Cone";
import Scoop from './Scoop'
import cherry from '../assets/cherry.svg'
import wafer from '../assets/wafer.svg'
import sprinkles from '../assets/sprinkles.png'
import WAFERS from "../constants/WAFERS";
import { useEffect } from "react";

const getIcecreamConfigFromPreset = (presetIcecream) => {
  const scoops = [];
  let wafers = [],
    toppings = [];
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
    } else if (name === 'Sprinkles') {
      toppings = [

      ]
    }
  })

  return ({
    scoops,
    wafers,
    addCherry,
    toppings
  });
};

const IcecreamEditor = ({ presetIcecream, hasCone = true }) => {
  return <div className="flex items-center justify-center ">
    <div className="m-auto flex flex-col items-center">
      <Scoops presetIcecream={presetIcecream} />
      {hasCone && <Cone />}
    </div>
  </div>;
}

export default IcecreamEditor;

export function Scoops({ presetIcecream }) {
  const [icecreamConfig, seticecreamConfig] = useState({
    scoops: [],
    toppings: [],
    addCherry: false,
    wafers: [],
  });

  useEffect(() => {
    if (presetIcecream !== undefined) {
      seticecreamConfig({
        ...getIcecreamConfigFromPreset(presetIcecream)
      });
    }
  }, [presetIcecream]);
  return (
    <div className="flex h-56 w-full flex-col-reverse items-center relative">
      {
        icecreamConfig.wafers.map((item, index) => (
          <img key={index} style={{
            width: 25,
            position: 'absolute',
            zIndex: 3 + index,
            top: (-10 + index * 10) + '%',
            left: `${15 + index * 50}%`,
            transform: `rotateZ(${(index % 2 === 0 ? '-' : '') + "25"}deg)`,
          }} src={wafer} alt='wafer' />
        ))
      }
      {icecreamConfig.scoops.map((flavour, index) => (
        <Scoop key={flavour.id + index.toString()} flavour={flavour} scoopIndex={index}>
          {
            (icecreamConfig.addCherry && index === 0) && (
              <img key="cherry" className="w-10 z-50 absolute transform -translate-x-1/2 left-1/2 -top-8" src={cherry} alt='cherry' />
            )
          }
          <div className="w-full h-40 relative overflow-hidden rounded-full">
            <img alt="sprinkles" src={sprinkles} />
            <img alt="sprinkles" src={sprinkles} />
            {/* icecreamConfig.toppings.map((topping) => {
                return topping;
              }) */}
          </div>
        </Scoop>
      ))}
    </div>
  );
}
