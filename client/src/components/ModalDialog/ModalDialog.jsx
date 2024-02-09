import styles from "./ModalDialog.module.css";

//* Modal Dialog Box:
//* Componente para mostrar info o pedir confirmacion al usuario
//* Cuatro modos distintos configurables a traves del prop type:
//* "success", "error", "confirmation", "loading"
//* A traves del prop message se le proporciona al componente la info a mostrar (prop necesaria para todos los tipos)
//* Si el type es "confirmation" deben pasarse dos funciones por props mas para manejar los botones: handleYesClick y handleNoClick

const ModalDialog = ({
  show,
  type,
  message,
  handleYesClick,
  handleNoClick,
}) => {
  return (
    show && (
      <div className={styles.divBackground}>
        <div className={styles.divDialog}>
          <h2>{message}</h2>
          {type === "success" && <h1 className={styles.h1Success}>✔</h1>}
          {type === "error" && <h1 className={styles.h1Error}>✖</h1>}
          {type === "loading" && <h1 className={styles.h1Loading}>🕹</h1>}
          {type === "confirmation" && (
            <div className={styles.divButtons}>
              <button onClick={handleYesClick} className={styles.buttons}>
                <span className={styles.spanButtons}>Yes</span>
              </button>
              <button onClick={handleNoClick} className={styles.buttons}>
                <span className={styles.spanButtons}>No</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ModalDialog;
