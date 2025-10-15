import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchFields, setSearchFields] = useState("");
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const searchProducts = (e) => {
    setSearchFields(e.target.value);
  };

  const Search = () => {
    if (!searchFields.trim()) return;
    fetchDataFromApi(`/api/search?q=${encodeURIComponent(searchFields)}`).then((res) => {
      context.setSearchData(res || []);
      navigate(`/search?q=${encodeURIComponent(searchFields)}`);
    });
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
