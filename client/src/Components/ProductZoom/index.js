import InnerImageZoom from 'react-inner-image-zoom';
import Slider from "react-slick"
import 'react-inner-image-zoom/lib/styles.min.css';
import { useRef, useState } from "react"

const ProductZoom = ({product}) => {
    const [slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSlider = useRef()
     const settingsThumb = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true
  }

  const settingsBig = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }
    const goto = (index) => {
        setSlideIndex(index)
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };
    return (

        <>


            <div className="productZoom">
{product?.discount > 0 && (
  <div
    className="badge badge-primary"
    style={{ position: 'absolute', top: '20px', left: '30px', zIndex: '1000' }}
  >
    {product.discount}%
  </div>
)}  
               {product?.images && product.images.length > 0 ? (
  <>
    {/* Slider ảnh chính */}
    <Slider {...settingsBig} className="zoomSliderBig" ref={zoomSliderBig}>
      {product.images.map((img, index) => (
        <div className="item imgZoom" key={index}>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={2}
            src={`${img}`}
          />
        </div>
      ))}
    </Slider>

    {/* Slider thumbnail */}
    <Slider {...settingsThumb} className="zoomSlider" ref={zoomSlider}>
      {product.images.map((img, index) => (
        <div
          key={index}
          className={`item ${slideIndex === index ? 'item_active' : ''}`}
        >
          <img
            src={`${img}`}
            className="w-100"
            alt={`thumbnail-${index}`}
            onClick={() => goto(index)}
          />
        </div>
      ))}
    </Slider>
  </>
) : (
  <div className="no-images">
    <img
      src="/no-image.png"
      alt="No images available"
      className="w-100"
    />
  </div>
)}

            </div>
        </>
    )
}

export default ProductZoom