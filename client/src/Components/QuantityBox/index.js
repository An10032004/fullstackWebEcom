import Button from "@mui/material/Button";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityBox = ({ quantity, setQuantity, max }) => {
  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const plus = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= max) {
      setQuantity(newValue);
    } else if (event.target.value === "") {
      setQuantity("");
    }
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min="1"
        max={max}
        style={{ width: "60px", textAlign: "center" }}
      />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
