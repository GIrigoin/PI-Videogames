import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.divNotFound}>
      <div className={styles.divInfo}>
        <h1 className={styles.text}>
          Sorry, the page you want is in another castle
        </h1>
        <button className={styles.buttons} onClick={() => navigate("/home")}>
          <span className={styles.spanButtons}>Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
