import React, { useEffect, useRef, useState } from "react";
import styles from './index.less';
const Locations = (props) => {
    const {
        onChange: getLatLng,
        placeholder
    } = props;
    const placeInputRef = useRef(null);
    const [locationName, setLocationName] = useState(props.value ? props.value.address: "");
    const [first, setFirst] = useState(true);
    var options = {
        componentRestrictions: { country: "vn" }
    };
    // initialize the google place autocomplete
    const initPlaceAPI = () => {
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current, options);
        // basic data avoid payment
        // https://developers.google.com/places/web-service/place-data-fields#basic
        autocomplete.setFields(["geometry.location"/*, "formatted_address", "name", "address_component", "adr_address"*/]);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();
            let address = placeInputRef.current.value.split(",", 1);
            setLocationName(address);
            if (place.geometry) {
                getLatLng({lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: address[0]});
            }
        });
    };
    const handleInput = e => {
        if (first) {
            initPlaceAPI();
            setFirst(false);
        }
        if (e.target.value == '') {
            getLatLng('');
        }
        setLocationName(e.target.value)
    }
    return (
        <>
            <input
                disabled={props.disabledFlag}
                type="text"
                ref={placeInputRef}
                placeholder={placeholder}
                value={locationName}
                className={styles.location}
                style={{ width: '95%' }}
                onChange={handleInput}
                 />
        </>
    );
};

export default Locations;