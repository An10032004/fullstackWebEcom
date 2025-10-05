// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'react-range-slider-input/dist/style.css'
import RangeSlider from 'react-range-slider-input';
import { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
const Sidebar = ({item,item2,onCategoryChange, onBrandChange,onPriceChange}) => {
    const [value, setValue] = useState([0, 60000]);
    // const [value2, setValue2] = useState(0);
    const handleCategory = (e, name) => {
    onCategoryChange(name, e.target.checked);
  };

  const handleBrand = (e, brand) => {

    onBrandChange(brand, e.target.checked);
  };
  const handlePrice = (val) => {
    setValue(val);
    onPriceChange(val);
  };
    return (

        <div className="sidebar">
          <div className='sticky'>
            <div className="filterBox">
                <h6>PRODUCT CATEGORIES</h6>
                <div className="scroll">
                    <ul>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                      ></RadioGroup>
                      {
                        item?.length !== 0 && item?.map((i,index) => {
                          return (
                            <li>
                            <FormControlLabel control={<Radio  onChange={(e) => handleCategory(e, i.name)}/>} label={i.name} />
                        </li>
                          )
                        })
                      }

                        
                        
                    </ul>
                </div>
            </div>

            <div className="filterBox mt-5">
                <h6>FILTER BY PRICE</h6>

                <RangeSlider value={value} onInput={handlePrice} min={0} max={60000} step={5} />

                <div className='d-flex pt-2 pb-2 priceRange'>
                    <span>From: <strong className='text-dark'>Price: {value[0]}</strong></span>
                    <span className='ml-auto'>From: <strong className='text-dark'>Price: {value[1]}</strong></span>
                </div>
            </div>

            <div className="filterBox mt-5">
        <h6>PRODUCT STATUS</h6>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel control={<Checkbox />} label="In Stock" />
            </li>
            <li>
              <FormControlLabel control={<Checkbox />} label="On Sale" />
            </li>
            
          </ul>
        </div>
      </div>


      <div className="filterBox mt-5">
  <h6>BRAND</h6>
  <div className="scroll">
    <ul>
      {
                        item2?.length !== 0 && item2?.map((i,index) => {
                          return (
                            <li>
                            <FormControlLabel control={<Checkbox onChange={(e) => handleBrand(e, i)} />} label={i} />
                        </li>
                          )
                        })
                      }
    </ul>
  </div>
</div>
        </div>
</div>
    );
};

export default Sidebar