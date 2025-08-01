import Button from "@mui/material/Button"
import { FaAngleDown } from "react-icons/fa"
import Dialog from "@mui/material/Dialog"
import { MdClose } from "react-icons/md"
import { useContext, useEffect, useState } from "react"
import Slide from '@mui/material/Slide'
import React from "react"
import { MyContext } from "../../App"
const Transition = React.forwardRef(function Transition(prop, ref) {
    return <Slide direction='up' ref={ref} {...prop} />
})

const CountryDropDown = () => {
    const [isOpenModal, setisOpenModal] = useState(false)
    const [selectedTab,setSelectedTab] = useState(null)
    const [countryList,setCountryList] = useState([])
    const context = useContext(MyContext)
    
    const selectCountry=(index,name) => {
        setSelectedTab(index)
        setisOpenModal(false)
        context.setselectedCountry(name)
    }

    useEffect(() => {
        setCountryList(context.countryList)
    },[context.countryList])
    const filterList = (e) => {
        const keyword = e.target.value.toLowerCase()
        if(keyword!==""){
             const list =countryList.filter((item) => {
            return item.name.toLowerCase().includes(keyword)
        })
        setCountryList(list)
        }else{
           setCountryList(context.countryList) 
        }
       
        
    }

    return (
        <>
            <Button className="countryDrop" onClick={() => setisOpenModal(true)}>
                <div className="info d-flex flex-column">
                    <span className="lable">Your Location</span>
                    <span className="name">{context.selectedCountry!=="" ? context.selectedCountry : "Select a location"}</span>
                </div>
                <span className="ml-5"><FaAngleDown /></span>
            </Button>

            <Dialog open={isOpenModal} onClose={() => setisOpenModal(false)} className='locationModal' TransitionComponent={Transition}>
                <h4>Choose your location</h4>
                <p>Enter your address</p>
                <Button className="close_" onClick={() => setisOpenModal(false)}><MdClose /></Button>
                <div className="headerSearch w-100">
                    <input type="text" placeholder="Search for location..."  onChange={filterList}/>


                </div>
                <ul className="countryList mt-3">
                    {
                        countryList?.length !== 0 && countryList?.map((item,index) => {
                            return (
                                <li key={index}><Button onClick={() => selectCountry(index,item.name)} className={`${selectedTab===index ? 'active' : ''} ` }>{item.name}</Button></li>

                            )
                        })
                    }

                </ul>
            </Dialog>
        </>
    )
}

export default CountryDropDown