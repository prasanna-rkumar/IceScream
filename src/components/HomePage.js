import IceCreamOfTheDay from './IceCreamOfTheDay';
import MakeYourOwnFAB from './MakeYourOwnFAB';
import IceCreamList from './IceCreamList';
import PageContainer from './PageContainer';

const HomePage = () => {
  return (
    <PageContainer>
      <IceCreamOfTheDay />
      <IceCreamList />
      <MakeYourOwnFAB />
    </PageContainer>
  );
};

export default HomePage;