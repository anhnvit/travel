import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const MapContainer = (props) => {
    const {
        latLng,
    } = props;
    if (!props.google) {
        return <div>Loading...</div>;
    }
    const latLngDefaut = [
        {
            lat: 10.335675,
            lng: 112.740167,
            label: 'Trường sa',
            icon: '/icons/marker.png'
        },
        {
            lat: 16.535675,
            lng: 111.340167,
            label: 'Hoàng sa',
            icon: '/icons/marker.png'
        },
    ]
    const bounds = new google.maps.LatLngBounds();
    if (Object.keys(latLng).length > 0) {
        for (let i = 0; i < latLng.length; i++) {
            bounds.extend(latLng[i]);
        }
    } else {
        // 4 điểm xung quang hồ gươm
        bounds.extend({ lat: 21.0251234, lng: 105.8519701 })
            .extend({ lat: 21.0287775, lng: 105.8503278 })
            .extend({ lat: 21.0316826, lng: 105.8533466 })
            .extend({ lat: 21.0285268, lng: 105.8553157 });
    }
    return ((<div id="mapTest" style={{
        background: '#f0f2f5',
        width: '100%',
        height: 'calc(100vh - 108px)',
        padding: '24px'
    }}>
        <Map className='map-left'
            initialCenter={{
                lat: 21.028333,
                lng: 105.853333
            }}
            zoom={16}
            google={props.google}
            bounds={bounds}
        >
            {latLng.map((coordinates, index) => (
                <Marker
                    key={index}
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                    name={name}
                />))}
                {latLngDefaut.map((coordinates, index) => (
            <Marker
                key={`defaut ${index}`}
                position={{ lat: coordinates.lat, lng: coordinates.lng }}
                icon={coordinates.icon}
                label={coordinates.label}
            />))}
        </Map>
    </div>)
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBfshobTdwlozR0Qx_ThQt3h0tTojPu4Bk',
    language :'vi',
    region:'VN'
})(MapContainer);

MapContainer.propTypes = {
    google: PropTypes.shape({}).isRequired,
};
