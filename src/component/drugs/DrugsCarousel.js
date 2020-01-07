import React,{useState} from 'react';
import Carousel from "react-bootstrap/Carousel";


export const DrugsCarousel = () => {

    const [index , setIndex] = useState(0);
    const [direction , setDirection] = useState(null);

    const selected = (selectedIndex , event ) => {
        setIndex(selectedIndex);
        setDirection(event.direction);
    }

    return <Carousel index={index} interval="3000" 
                    direction={direction} onSelect={selected}>
        <Carousel.Item>
            <img src={require('../../img/drug1.jpg')} alt="drug" className="d-block w-100" />    
        </Carousel.Item>         
        <Carousel.Item>
            <img src={require('../../img/drug2.jpg')} alt="drug" className="d-block w-100" />    
        </Carousel.Item>             
    </Carousel>



}