import { useState } from "react";
import FLAVORS from "../constants/FLAVORS";
import Cone from "./Cone";
import Scoop from './Scoop'
import Sprinkles from "./Sprinkles";
import cherry from '../assets/cherry.svg'

const IcecreamEditor = () => {
  const [chocolateConfig, setChocolateConfig] = useState({
    scoops: [
      FLAVORS.strawberry,
      FLAVORS.chocolate,
    ],
    toppings: [
      <Sprinkles key="sprinkles" />
    ],
    addCherry: true
  });

  return <div className="m-auto flex flex-col items-center">
    <div className="flex h-56 w-full flex-col-reverse items-center relative">
      {chocolateConfig.scoops.map((flavor, index) => (
        <Scoop key={flavor.primary} flavor={flavor} scoopIndex={index}>
          <div>
            {chocolateConfig.toppings.map((topping) => {
              return topping;
            })}
          </div>

        </Scoop>
      ))}
      {
        chocolateConfig.addCherry && (
          <img style={{
            top: '-25%',
            transform: 'translateX(-25px)',
            position: 'absolute',
          }} src={cherry} alt='cherry' />
        )
      }
    </div>

    <Cone />
  </div>;
}

export default IcecreamEditor;
