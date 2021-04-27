import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import iceCreamsList from '../graphql/queries/icecreamsList';
import calculateTotal from '../utils/calculateTotal';
import { Scoops } from './IcecreamEditor';

const IceCreamList = () => {
  const { loading, error, data } = useQuery(iceCreamsList);

  if (loading) return ('loading...');
  if (error) return ('error');

  const { presetIcecreams } = data;

  return (
    <div className=" mt-8">
      <h2 className="text-2xl font-bold text-pink-700">Best Sellers</h2>
      <div className="list-container p-0.5 mt-20 mb-8 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-28 pt-0.5">
        {
          presetIcecreams.map((presetIcecream, index) => (
            <Link key={presetIcecream.id} to={`/ice-cream/${presetIcecream.id}/${encodeURI(presetIcecream.nickName)}`}>
              <div className="list-tile flex flex-col items-center group hover:shadow-lg cursor-pointer p-4 rounded-3xl max-w-xs mx-auto w-full bg-pink-300" key={presetIcecream.id}>
                <div className="transform transition-all group-hover:scale-105 scoops-container h-28 flex justify-center -translate-y-12 w-40">
                  <Scoops presetIcecream={presetIcecream} />
                </div>
                <div className="w-full mt-16 pt-2">
                  <h6 className="font-semibold text-red-900 text-xl">
                    {presetIcecream.nickName}{' '}
                  </h6>
                  <span className="text-xs relative -top-1.5">({presetIcecream.scoops.length} x Scoops)</span>
                  <p className="text-white font-semibold">
                    ₹{calculateTotal(presetIcecream)}
                  </p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default IceCreamList;
