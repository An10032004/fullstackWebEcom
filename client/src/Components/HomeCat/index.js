import React,{useEffect, useState} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
const HomeCat = (props) => {

    const [catData,setCatData] = useState([])
    
    useEffect(() => {
        setCatData(props.catData)
        
    },[props.catData])

    // const [itembg] = useState([
    //     '#fffceb',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',
    //     '#fffceb',
    //     '#feefea',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feefea',
    // ])
    
    return (
        <>

            <section className="homeCat">

                <div className="container-fluid" style={{ padding: '0 45px' }}>
                    <h3 className="hd ml-3" >Feature categories</h3>
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={10}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {
                            catData?.map((item, index) => {
                                return(
                                    <SwiperSlide>
                                    <div className="item text-center cursor" style={{background:item}}>
                                        <img alt="" src={item.images[0]} />

                                        <h6 className="text-center">{item.name}</h6>
                                    </div>

                                </SwiperSlide>
                                )
                                
                            })
                        }





                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default HomeCat