import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../assets/Logo.svg";

const Landing = () => {
  const navigate = useNavigate();

  const handleMouseOver = async () => {
    const player = new Audio(
      "https://dl.vgmdownloads.com/soundtracks/super-mario-bros.-3-1988-nes/zottfhfbri/37.%20Move%20Cursor%20%28Map%29.mp3"
    );
    await player.play();
  };
  const handleClick = async (event) => {
    const player = new Audio(
      "https://dl.vgmdownloads.com/soundtracks/super-mario-bros.-3-1988-nes/ciqzdtyhux/36.%20Level%20Start.mp3"
    );
    await player.play();
    event.target.innerHTML === "Home"
      ? navigate("/home")
      : navigate("/addgame");
  };
  return (
    <div className={styles.divContainer}>
      <div className={styles.divImage}>
        <img
          src={logo}
          alt="Super Videogames Database 2"
          className={styles.logo}
        />
      </div>
      <div className={styles.divButtons}>
        <div
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          name="home"
          className={styles.divButton}
        >
          Home
        </div>

        <div
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          name="add"
          className={styles.divButton}
        >
          Add Game
        </div>
      </div>
    </div>
  );
};

export default Landing;
