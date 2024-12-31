import React, { useEffect, useRef } from 'react';

const Globe = ({ kindnessActs }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize the globe
        const map = new google.maps.Map(mapRef.current, {
            zoom: 3,
            center: { lat: 0, lng: 0 },
            mapTypeId: 'satellite',
            disableDefaultUI: true,
            mapId: 'YOUR_MAP_ID' // Create this in Google Cloud Console
        });

        // Enable WebGL and set to globe view
        map.setTilt(45);

        mapInstance.current = map;

        // Add markers for each kindness act
        kindnessActs.forEach(act => {
            if (act.location?.latitude && act.location?.longitude) {
                new google.maps.Marker({
                    position: {
                        lat: act.location.latitude,
                        lng: act.location.longitude
                    },
                    map: map,
                    title: act.description
                });
            }
        });
    }, [kindnessActs]);

    return (
        <div 
            ref={mapRef} 
            style={{ 
                width: '100%', 
                height: '600px',
                borderRadius: '50%',
                overflow: 'hidden'
            }}
        />
    );
};

export default Globe; 