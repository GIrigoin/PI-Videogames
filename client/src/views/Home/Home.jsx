import styles from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  return (
    <div className={styles.divHome}>
      <NavBar></NavBar>
      <Cards></Cards>
    </div>
  );
};

export default Home;
