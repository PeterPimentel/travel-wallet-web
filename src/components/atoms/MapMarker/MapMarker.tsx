import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { BASE_COLORS } from '../../../constants';

type MapMarkerProps = {
    lat: number;
    long: number;
    children: React.ReactNode;
}

const MapMarker = ({ lat, long, children }: MapMarkerProps) => {
    const icon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(<FaMapMarkerAlt style={{
            width: '30px',
            height: '30px',
            color: BASE_COLORS.primary
        }} />),
    });

    return (
        <Marker position={[lat, long]} riseOnHover={true} icon={icon}>
            {children}
        </Marker>
    );
}

export default React.memo(MapMarker);
