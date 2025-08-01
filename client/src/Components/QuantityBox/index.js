import Button from "@mui/material/Button"
import { useState } from "react";
import { FaMinus, FaPlus } from 'react-icons/fa';
const QuantityBox = () => {

    const [inputValue,setInputValue]  = useState(1)
    const minus = () => {
        if(inputValue > 0){
            setInputValue(inputValue-1)
        }
        
    }
     const plus = () => {
        setInputValue(inputValue+1)
    }
     const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value); // Chuyển đổi giá trị nhập vào thành số nguyên
        if (!isNaN(newValue) && newValue >= 0) { // Đảm bảo giá trị là số hợp lệ và không âm
            setInputValue(newValue);
        } else if (event.target.value === '') { // Xử lý trường hợp người dùng xóa hết input
            setInputValue(0); // Hoặc bạn có thể đặt là '' nếu muốn cho phép ô trống tạm thời
        }
    };
    return (
        <>
        <div className='quantityDrop d-flex align-items-center'>
                            <Button onClick={minus}><FaMinus /></Button>
                            <input type="text"  value={inputValue} onChange={handleInputChange}/>
                            <Button onClick={plus}><FaPlus /></Button>
                        </div>
                        
                        </>
    )
}

export default QuantityBox