import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import iceCreamOfTheDays from "../graphql/queries/iceCreamOfTheDays";
import { getScoopCounts } from "./IceCreamDetails";
import { Scoops } from "./IcecreamEditor";

const IceCreamOfTheDay = () => {
  const { error, loading, data } = useQuery(iceCreamOfTheDays);

  if (error) return ('error');
  if (loading) return ('loading...');

  const presetIcecream = (data.icecreamOfTheDays[0].preset_Icecream)
  const scoopCounts = getScoopCounts(presetIcecream.scoops);
  return (
    <div
      className="bg-purple-800 mx-auto max-w-2xl hover:shadow-lg cursor-pointer mt-5 py-4 px-0 sm:px-4 rounded-2xl"
    >
      <Link to={`/ice-cream/${presetIcecream.id}/${encodeURI(presetIcecream.nickName)}`}>
        <h6 className="tracking-wider uppercase text-xs font-bold text-purple-200 invisible sm:visible">Icecream of the Day</h6>
        <div className=" flex flex-col-reverse items-start sm:flex-row">
          <div className="sm:max-w-xs w-full pl-2 mt-6 pt-0.5">
            <h6 className="tracking-wider uppercase text-xs font-semibold text-purple-300 text-center visible sm:invisible">Icecream of the Day</h6>
            <h3 className="text-white font-medium text-2xl">{presetIcecream.nickName}</h3>
            {Object.keys(scoopCounts).map((key, index) => {
              return (
                <div className="col-span-1" key={key}>
                  <p className="text-purple-300">{scoopCounts[key].count} x {key}</p>
                </div>
              );
            })}
          </div>
          <div className="h-44 w-full relative flex justify-center">
            <div className=" w-40 absolute -top-8">
              {
                <Scoops presetIcecream={presetIcecream} />
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default IceCreamOfTheDay;
