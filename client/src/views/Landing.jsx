import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleMouseOver = async () => {
    const player = new Audio(
      "https://dl.vgmdownloads.com/soundtracks/super-mario-bros.-3-1988-nes/zottfhfbri/37.%20Move%20Cursor%20%28Map%29.mp3"
    );
    await player.play();
  };
  const handleClick = async () => {
    const player = new Audio(
      "https://dl.vgmdownloads.com/soundtracks/super-mario-bros.-3-1988-nes/ciqzdtyhux/36.%20Level%20Start.mp3"
    );
    await player.play();
    navigate("/home");
  };
  return (
    <div>
      <div>Super Videogames Database 2</div>

      <div onClick={handleClick} onMouseOver={handleMouseOver}>
        Ingresar
      </div>
    </div>
  );
};

export default Landing;
