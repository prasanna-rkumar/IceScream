import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import FLAVORS from '../constants/FLAVORS';
import iceCreamsList from '../graphql/queries/icecreamsList';
import calculateTotal from '../utils/calculateTotal';
import Scoop from './Scoop';

const IceCreamList = () => {
  const { loading, error, data } = useQuery(iceCreamsList);
  const history = useHistory();

  if (loading) return ('loading...');
  if (error) return ('error');

  const { presetIcecreams } = data;

  return (
    <div className=" mt-8">
      <h2 className="text-2xl font-bold text-pink-700">Best Sellers</h2>
      <div className="list-container p-0.5 mt-20 mb-8 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-28 pt-0.5">
        {
          presetIcecreams.map((presetIcecream, index) => (
            <div onClick={() => {
              history.push(`/ice-cream/${presetIcecream.id}/${encodeURI(presetIcecream.nickName)}`)
            }} className="list-tile group hover:shadow-lg cursor-pointer p-4 rounded-3xl max-w-xs mx-auto w-full bg-pink-300" key={index}>
              <div className="transform transition-all group-hover:scale-105 scoops-container h-28 flex justify-center -translate-y-12">
                {
                  presetIcecream.scoops.map((scoop, index) => {
                    console.log(scoop.icecream_flavour.flavour)
                    return (
                      <Scoop key={index} flavour={FLAVORS[scoop.icecream_flavour.flavour]} scoopIndex={index}>
                      </Scoop>
                    )
                  })
                }
              </div>
              <div className=" mt-2">
                <h6 className="font-semibold text-red-900 text-xl">
                  {presetIcecream.nickName}{' '}
                </h6>
                <span className="text-xs relative -top-1.5">({presetIcecream.scoops.length} x Scoops)</span>
                <p className="text-white font-semibold">
                  ₹{calculateTotal(presetIcecream)}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default IceCreamList;
