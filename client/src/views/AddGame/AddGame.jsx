import { useDispatch, useSelector } from "react-redux";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { setModal } from "../../redux/actions";

const AddGame = () => {
  const dispatch = useDispatch();
  const modalDialog = useSelector((state) => state.modalDialog);
  const handleOpenModal = () => {
    dispatch(
      setModal({
        show: true,
        type: "confirmation",
        message: "Soy un dialogbox!",
      })
    );
    //   await setTimeout(() => {
    //     dispatch(setModal({ show: false }));
    //   }, 2000);
  };
  const handleYesClick = async () => {
    dispatch(
      setModal({
        show: true,
        type: "success",
        message: "apretaste yes. YEEEEEAAHHHH!",
      })
    );
    await setTimeout(() => {
      dispatch(setModal({ show: false }));
    }, 2000);
  };

  const handleNoClick = () => {
    dispatch(setModal({ show: false }));
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir</button>
      <ModalDialog
        show={modalDialog.show}
        type={modalDialog.type}
        message={modalDialog.message}
        handleNoClick={handleNoClick}
        handleYesClick={handleYesClick}
      />
    </div>
  );
};

export default AddGame;
