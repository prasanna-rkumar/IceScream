import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import iceCream from '../graphql/queries/icecream';
import PageContainer from './PageContainer';
import IcecreamEditor from './IcecreamEditor';
import { useEffect, useState, useContext } from 'react';
import Scoop from './Scoop';
import FLAVORS from '../constants/FLAVORS';
import calculatePresetTotal from '../utils/calculatePresetTotal'
import TOPPINGS from '../constants/TOPPINGS';
import CartContext from '../context/CartContext';

export const getScoopCounts = (scoops) => {
  const temp = {};

  scoops.forEach(({ icecream_flavour: scoop }) => {
    if (temp.hasOwnProperty(scoop.flavour)) {
      temp[scoop.flavour].count += 1;
    } else {
      temp[scoop.flavour] = {
        count: 1,
        price: scoop.price
      };
    }
    temp[scoop.flavour].price = scoop.price;
  })

  return temp;
};

const IceCreamDetails = () => {
  const [scoopCounts, setScoopCounts] = useState({});
  const { addToCart, toggleCart } = useContext(CartContext);
  const { id } = useParams();
  const { error, loading, data } = useQuery(iceCream, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const { scoops } = data.preset_Icecream;

      setScoopCounts({ ...getScoopCounts(scoops) });
    }
  }, [error, loading, data]);

  if (loading && data === undefined) return ('loading...');
  if (error) return ('error');

  const { nickName, toppings } = data.preset_Icecream;

  return (
    <PageContainer>
      <div className="mx-auto flex flex-col sm:grid grid-cols-6 sm:gap-2">
        <div style={{
          backgroundColor: "lightseagreen",
        }} className="rounded-3xl pt-8 p-4 col-span-4" >
          <div className="">
            <IcecreamEditor presetIcecream={data.preset_Icecream} />
          </div>
          <div>
            <h6 className="font-bold text-white text-2xl sm:text-3xl lg:text-4xl">
              {nickName}{' '}
            </h6>
            <div className="flex gap-0.5 justify-between flex-col sm:flex-row mt-2">
              <span className="text-lg font-semibold text-white text-opacity-80">
                ₹{calculatePresetTotal(data.preset_Icecream)}
              </span>
              <button onClick={() => {
                addToCart(data.preset_Icecream.id);
                toggleCart();
              }} style={{ color: "lightseagreen" }} className="p-2 px-3.5 text-sm font-medium uppercase bg-white rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-xl">
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 pt-0.5">
          <h4 className="text-2xl mb-8 sm:mb-14 text-purple-600 font-medium text-center underline">Scoops</h4>
          <div className="gap-y-8 h-full grid grid-flow-row grid-cols-2 sm:grid-cols-1">
            {Object.keys(scoopCounts).map((key, index) => {
              return (
                <div className="col-span-1" key={key}>
                  <div className="h-20 relative flex justify-center">
                    <Scoop className="transform scale-50 sm:scale-75 -top-16" scoopIndex={0} flavour={FLAVORS[key]} />
                  </div>
                  <p className="text-center">{scoopCounts[key].count} x {key}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-4 px-3 mt-4">
          <h4 className="text-2xl mb-4 text-purple-600 font-medium text-center underline">Toppings</h4>
          <div className=" flex flex-col lg:flex-row lg:justify-between gap-8">
            {toppings.map((topping, index) => {
              return <div key={topping.name} className="flex items-baseline justify-start gap-2 text-xl font-medium text-indigo-600">
                <img className="inline bg-pink-200 p-2 rounded-full" width={64} alt={topping.name} src={TOPPINGS[topping.name]} />
                <div className="relative bottom-6">
                  {topping.name}
                  <input type="checkbox" className="transform scale-110 ml-3" checked={true} onChange={(e) => true} />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

    </PageContainer>
  );
};

export default IceCreamDetails;
