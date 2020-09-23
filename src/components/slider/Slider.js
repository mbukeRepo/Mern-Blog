import React, { useEffect, useState } from "react";
import "./Slider.css";

const Slider = () => {
  const sliderImages = [
    "https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/937782/pexels-photo-937782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/4626/food-plate-morning-breakfast.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ];
  const [sliderCounter, setSliderCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCounter((sliderCounter) =>
        sliderCounter === sliderImages.length - 1 ? 0 : sliderCounter + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="sliderTitles">
        <span className="sliderSubTitle">React & Node</span>
        <span className="sliderTitle">BLOG</span>
      </div>
      <div
        className="sliderImages"
        style={{ transform: `translateX(${-sliderCounter * 100}vw)` }}
        onClick={() =>
          setSliderCounter(
            sliderCounter === sliderImages.length - 1 ? 0 : sliderCounter + 1
          )
        }
      >
        {sliderImages.map((s) => (
          <img src={s} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Slider;
