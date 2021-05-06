import { useState, createContext } from "react";


const MakeYourOwnContext = createContext();

export const CartProvider = ({ children }) => {
  const [icecreamConfig, setIcecreamConfig] = useState({
    scoops: [],
    toppings: [],
    addCherry: false,
    wafers: [],
  });

  const [step, setStep] = useState(0);

  const addScoop = (scoop) => {
    setIcecreamConfig((prev) => {
      if (prev.scoops.length === 3) {
        return prev
      } else {
        return [...prev, scoop]
      }
    })
  };

  const removeScoopScoop = (scoopID) => {
    setIcecreamConfig((prev) => {
      return prev.scoops.filter(scoop => scoop.id !== scoopID);
    })
  };

  const toggleCherry = () => {
    setIcecreamConfig((prev) => {
      return { ...prev, addCherry: !prev.addCherry }
    })
  };
  const toggleWafers = () => {
    
  };
  const toggleTopping = () => {
    
  };

  return (
    <MakeYourOwnContext.Provider value={{
      icecreamConfig,
      step,
      setStep,
      addScoop,
      removeScoopScoop,
      toggleCherry,
      toggleTopping,
      toggleWafers,
    }}>
      {children}
    </MakeYourOwnContext.Provider>
  );
}

export default MakeYourOwnContext;