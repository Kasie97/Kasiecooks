import React, { useEffect, useState } from "react";
import RiceDishDetailsCard from './riceDishDetailsCard';
import { RiceDaishData } from "./riceDishData";
import './riceDish.css';

const RiceDaish = () => {
    const [riceDaishData, setRiceDaishData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setRiceDaishData(RiceDaishData);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % riceDaishData.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? riceDaishData.length - 1 : prevIndex - 1));
    };

    return (
        <div className="scroll-container-category">
            <div className="scroll-content-category">
                {riceDaishData.map((category, index) => (
                    <div className={`scroll-content-category ${index === currentIndex ? 'visible' : 'hidden'}`} key={category.id}>
                        <RiceDishDetailsCard
                            id={category.id}
                            img={category.img}
                            title={category.name}
                            rating={category.rating}
                            address={category.location}
                            price={category.price}
                            availability={category.availability}
                            discount={category.discount}
                            discountPrice={category.discountPrice}
                        />
                    </div>
                ))}
            </div>
          
        </div>
    );
};

export default RiceDaish;
