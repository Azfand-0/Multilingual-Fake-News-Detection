import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
     
    </div>
  );
};

export default Home;
