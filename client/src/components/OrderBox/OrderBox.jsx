const OrderBox = ({ order, handleOrderChange }) => {
  return (
    <div>
      <div>
        <label>Order by: </label>
        <select
          name="criteria"
          value={order.criteria}
          onChange={handleOrderChange}
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div>
        <div>
          <span>🔺</span>
          <input
            type="range"
            name="order"
            min="0"
            max="1"
            step="1"
            value={order.order === "ASC" ? "0" : "1"}
            onChange={handleOrderChange}
          />
          <span>🔻</span>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
