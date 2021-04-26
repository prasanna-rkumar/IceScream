import { useState } from "react";
import FLAVORS from "../constants/FLAVORS";
import WAFERS from "../constants/WAFERS";
import Scoop from "./Scoop";
import Sprinkles from "./Sprinkles";

import cherry from '../assets/cherry.svg'

const IceCreamOfTheDay = () => {
  const [icecreamConfig] = useState({
    scoops: [
      FLAVORS.Vanilla,
      FLAVORS.Strawberry,
      FLAVORS.BlackCurrent,
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
  return (
    <div
      className="bg-purple-800 mx-auto max-w-2xl hover:shadow-lg cursor-pointer mt-5 py-4 px-0 sm:px-4 rounded-2xl"
    >
      <h6 className="tracking-wider uppercase text-xs font-bold text-purple-200 invisible sm:visible">Icecream of the Day</h6>
      <div className=" flex flex-col-reverse items-start sm:flex-row">
        <div className="sm:max-w-xs w-full pl-2">
          <h6 className="tracking-wider uppercase text-xs font-semibold text-purple-300 text-center visible sm:invisible">Icecream of the Day</h6>
          <h3 className="text-white font-medium text-2xl">Death By Chocolate</h3>
          {['Vanilla', 'Strawberry', 'Black Current'].map((flavour, index) => (
            <p key={index} className="text-purple-300">1 x {flavour}</p>
          ))}
        </div>
        <div className="h-44 w-full ">
          <div className="w-full flex flex-row-reverse justify-center sm:justify-start px-4">
            {icecreamConfig.scoops.map((flavour, index) => (
              <Scoop key={flavour.primary} flavour={flavour} scoopIndex={index}>
                {
                  (icecreamConfig.addCherry && index === 0) && (
                    <img key="cherry" className="w-10 z-50 absolute transform -translate-x-1/2 left-1/2 -top-8" src={cherry} alt='cherry' />
                  )
                }
                <div className="w-full h-40 relative overflow-hidden rounded-full">
                  {icecreamConfig.toppings.map((topping) => {
                    return topping;
                  })}
                </div>
              </Scoop>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IceCreamOfTheDay;
