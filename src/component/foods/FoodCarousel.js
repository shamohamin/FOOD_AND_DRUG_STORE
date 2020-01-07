import React,{useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

export const FoodCarousel = () => {
    const [index , setIndex] = useState(0);
    const [direction , setDirection] = useState(null);

    const handelSelect = (selectedIndex , e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    }

    return <Carousel activeIndex={index} direction={direction} 
                onSelect={handelSelect} interval="3000">
        <Carousel.Item>
            <img className="d-block w-100" alt="lettuce" src={require('../../img/food1.jpg')}/>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" alt="potato" src={require('../../img/food2.jpg')}/>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" alt="potato" src={require('../../img/food3.jpg')}/>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" alt="potato" src={require('../../img/food4.jpg')}/>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" alt="potato" src={require('../../img/food5.jpg')}/>
        </Carousel.Item>
    </Carousel>
}