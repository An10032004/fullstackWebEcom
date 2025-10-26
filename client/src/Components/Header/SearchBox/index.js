import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MyContext } from "../../../App";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const [searchFields, setSearchFields] = useState("");
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Lấy categoryId nếu đang ở trang category
  const match = location.pathname.match(/\/category\/([^/]+)/);
  const currentCategoryId = match ? match[1] : null;

  const searchProducts = (e) => {
    setSearchFields(e.target.value);
  };

  const Search = () => {
    if (!searchFields.trim()) return;

    if (currentCategoryId) {
      // 🔹 Đang trong category → search trong category
      navigate(`/category/${currentCategoryId}?q=${encodeURIComponent(searchFields)}`);
    } else {
      // 🔹 Search toàn bộ site
      navigate(`/search?q=${encodeURIComponent(searchFields)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") Search();
  };

  return (
    <div className="headerSearch ml-3 mr-3 d-flex align-items-center">
      <input
        type="text"
        placeholder="Search for product"
        value={searchFields}
        onChange={searchProducts}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={Search}>
        <IoSearch />
      </Button>
    </div>
  );
};

export default SearchBox;
