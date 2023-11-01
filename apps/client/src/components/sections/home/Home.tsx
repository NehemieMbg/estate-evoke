import HomeNavigation from './HomeNavigation';
import Posts from './Posts';

const Home = () => {
  return (
    <section className="home px-6 py-3 bg-white">
      <HomeNavigation />
      <Posts />
    </section>
  );
};
export default Home;
