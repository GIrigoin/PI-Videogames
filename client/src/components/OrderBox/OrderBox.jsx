import styles from "./OrderBox.module.css";

const OrderBox = ({ order, handleOrderChange }) => {
  return (
    <div>
      <div className={styles.divOrder}>
        <label className={styles.labelTitle}>Order by: </label>
        <select
          name="criteria"
          value={order.criteria}
          onChange={handleOrderChange}
          className={styles.selectOrder}
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className={styles.divOrder}>
        <div className={styles.divRange}>
          <span>🔺</span>
          <input
            type="range"
            name="order"
            min="0"
            max="1"
            step="1"
            value={order.order === "ASC" ? "0" : "1"}
            onChange={handleOrderChange}
            className={styles.rangeOrder}
          />
          <span>🔻</span>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
