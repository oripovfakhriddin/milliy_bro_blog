import { useEffect, useState } from "react";
import request from "../../server";

import "./popular.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import { IMG } from "../../const";
import Slider from "react-slick";
import { trueDate } from "../../utils/data";
import { NavLink } from "react-router-dom";

const PopularCard =  () => {
  const [data, setData] = useState([]);
  const getPopular = async () => {
   let {data}= await request.get("post/lastones");
    setData(data);
  };

  useEffect(()=>{
    getPopular()

  },[])

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {data.map((card) => (
          <NavLink to={`/post/${card._id}`} key={card?._id} className="card">
            <div className="img_container">
            <img
                    
                    src={card.photo !== null ? 
                      IMG + card?.photo?._id + "." + card?.photo?.name.split(".")[1] : "https://loremflickr.com/320/240" }
                  />
            </div>
            <div className="popular-text">
              <p>
                By <span>{card.user.first_name}</span>
                {" | "}
                {trueDate(card.createdAt)}{" "}
              </p>
              <h2>{card.title}</h2>
              <p className="popular_text">{card.description}</p>
            </div>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
};

export default PopularCard;
