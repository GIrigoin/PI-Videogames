import styles from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { useSelector } from "react-redux";

const Home = () => {
  const dialog = useSelector((state) => state.modalDialog);
  return (
    <div className={styles.divHome}>
      <NavBar></NavBar>
      <Cards></Cards>
      <ModalDialog
        show={dialog.show}
        type={dialog.type}
        message={dialog.message}
      />
    </div>
  );
};

export default Home;
