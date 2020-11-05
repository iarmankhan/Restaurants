import styled from 'styled-components/native'

export const MapContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: flex-end;
    align-items: center;
`;

export const MapMarkerOutside = styled.View`
    position: relative;
    border-radius: 25px;
    width: 50px;
    height: 50px;
    background-color: #888;
    opacity: 0.2;
`;

export const MapMarkerInside = styled.View`
    position: absolute;
    border-radius: 13px;
    width: 25px;
    height: 25px;
    
    top: 50%;
    left: 50%;
    margin: -12.5px 0 0 -12.5px;
    z-index: 10;
    
    background-color: lightgreen;
`;
