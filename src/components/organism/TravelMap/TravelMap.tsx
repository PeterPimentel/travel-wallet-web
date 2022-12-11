import React, { useMemo } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

import { Expense } from '../../../types/ExpenseType';
import { getMapData } from '../../../util';

import MapMarker from '../../atoms/MapMarker/MapMarker';
import { MapPopup } from '../../molecules/MapPopup/MapPopup';

import styles from './style.module.css';

type TravelMapsProps = {
    expenses: Expense[];
};

const START_LAT = 48.8589465;
const START_LONG = 2.2768234;

function FlyTo({ lat, long }: { lat: number, long: number }) {
    const map = useMapEvents({});
    map.flyTo([lat || START_LAT, long || START_LONG], map.getZoom());

    return null;
}

const TravelMap = ({ expenses }: TravelMapsProps) => {

    const groupedExpenses = useMemo(() => {
        return getMapData(expenses)
    }, [expenses])

    return (
        <MapContainer
            className={styles.container}
            center={[START_LAT, START_LONG]}
            zoom={5}
            minZoom={3}
            maxZoom={20}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                groupedExpenses.map(exp => (
                    <MapMarker key={exp.label} lat={exp.lat} long={exp.long}>
                        <MapPopup
                            title={exp.label}
                            days={exp.days}
                            spent={exp.value}
                            startDate={exp.startDate}
                            endDate={exp.endDate}
                        />
                    </MapMarker>
                ))
            }
            <FlyTo lat={groupedExpenses[0].lat} long={groupedExpenses[0].long} />
        </MapContainer>
    );
}

export default TravelMap