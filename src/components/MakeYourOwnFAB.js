import { Link } from 'react-router-dom';
import scoopIcon from '../assets/scoop.svg';

const MakeYourOwnFAB = () => {
  return (
    <Link to="/ice-cream-editor">
      <button className="bg-pink-600 sm:px-3.5 transform transition-all hover:scale-110 bg-transparent rounded-full fixed bottom-4 right-4 hover:shadow sm:bottom-8 sm:right-8">
        <img className="block sm:hidden" width={56} height={56} src={scoopIcon} alt="Scoop" />
        <p className="hidden leading-9 sm:block text-center text-white text-sm font-semibold uppercase">
          Make your Own
        </p>
      </button>
    </Link>
  );
}

export default MakeYourOwnFAB;
