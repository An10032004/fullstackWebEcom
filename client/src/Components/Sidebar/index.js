// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'react-range-slider-input/dist/style.css'
import RangeSlider from 'react-range-slider-input';
import { useState } from 'react';
const Sidebar = () => {
    const [value, setValue] = useState([100, 60000]);
    // const [value2, setValue2] = useState(0);
    return (

        <div className="sidebar">
          <div className='sticky'>
            <div className="filterBox">
                <h6>PRODUCT CATEGORIES</h6>
                <div className="scroll">
                    <ul>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                        <li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li><li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li><li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li><li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li><li>
                            <FormControlLabel control={<Checkbox />} label="Men" />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="filterBox mt-5">
                <h6>FILTER BY PRICE</h6>

                <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5} />

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
      <li>
        <FormControlLabel control={<Checkbox />} label="Nike" />
      </li>
      <li>
        <FormControlLabel control={<Checkbox />} label="Adidas" />
      </li>
      <li>
        <FormControlLabel control={<Checkbox />} label="Puma" />
      </li>
      <li>
        <FormControlLabel control={<Checkbox />} label="Reebok" />
      </li>
      <li>
        <FormControlLabel control={<Checkbox />} label="Converse" />
      </li>
      <li>
        <FormControlLabel control={<Checkbox />} label="Vans" />
      </li>
    </ul>
  </div>
</div>
        </div>
</div>
    );
};

export default Sidebar