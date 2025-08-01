import InnerImageZoom from 'react-inner-image-zoom';
import Slider from "react-slick"
import 'react-inner-image-zoom/lib/styles.min.css';
import { useRef, useState } from "react"

const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSlider = useRef()
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true
    };

    var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };
    const goto = (index) => {
        setSlideIndex(index)
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };
    return (

        <>


            <div class="productZoom">
                <div className="badge badge-primary " style={{ position: 'absolute', top: '20px', left: '30px', zIndex: '1000' }}>23%</div>
                <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>

                    <div className='item'> {/* Added key prop for list rendering */}
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                        />
                    </div>

                    <div className='item'> {/* Added key prop for list rendering */}
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                        />
                    </div>
                    <div className='item'> {/* Added key prop for list rendering */}
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                        />
                    </div>
                    <div className='item'> {/* Added key prop for list rendering */}
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                        />
                    </div>

                </Slider>

                <Slider {...settings} className='zoomSlider' ref={zoomSlider}>
                    <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                        <img
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                            className='w-100'
                            alt=""
                            onClick={() => goto(0)}
                        />
                    </div>
                    <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                        <img
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                            className='w-100'
                            alt=""
                            onClick={() => goto(1)}
                        />
                    </div>
                    <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                        <img
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                            className='w-100'
                            alt=""
                            onClick={() => goto(2)}
                        />
                    </div>
                    <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                        <img
                            src={`https://shop.armando-cabral.com/cdn/shop/files/Armando-Cabral-EMPADA-Slip-on-Sneaker-Bianco-Profile_37df031a-5d11-4ab2-8dcf-ebd3feda61d4.jpg?v=1710461434`}
                            className='w-100'
                            alt=""
                            onClick={() => goto(3)}
                        />
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default ProductZoom