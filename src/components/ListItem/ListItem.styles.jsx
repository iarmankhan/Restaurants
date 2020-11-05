import styled from 'styled-components/native'

export const ListItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin: 6px 10px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    overflow: visible;
    align-items: center;
`;

export const ImageContainer = styled.View`
    width: 65px;
    height: 65px;
    border-radius: 20px;
    margin-right: 10px;
`;

export const RestaurantDetails = styled.View`
    align-items: flex-start;
`;

export const RestaurantName = styled.Text`
    max-width: 190px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
`;

export const MapIcon = styled.TouchableOpacity`
    margin-left: auto;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 8px;
    background-color: lightgreen;
    border-radius: 8px;
`;
