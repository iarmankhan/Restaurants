import React from 'react';
import {Star, StarsContainer} from './Stars.styles';

const Stars = ({score}) => {
    const stars = [];
    let type = 1;
    for (let i = 1; i <= 5; i++) {
        type = i <= score ? type : 0;
        stars.push(type);
    }

    return (
        <StarsContainer>
            {stars.map((star, i) => {
                return <Star key={i} source={star === 1 ? require('../../assets/img/Star-fill.png') : require('../../assets/img/Star-empty.png')}/>;
            })}
        </StarsContainer>
    );
};

export default Stars;
