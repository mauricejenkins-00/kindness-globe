import React, { useState, useEffect } from 'react';
import Globe from '../components/Globe';
// ... other imports

const HomePage = () => {
    const [kindnessActs, setKindnessActs] = useState([]);

    useEffect(() => {
        // Fetch kindness acts from your database
        const fetchKindnessActs = async () => {
            try {
                const response = await fetch('/api/kindness-acts');
                const data = await response.json();
                setKindnessActs(data);
            } catch (error) {
                console.error('Error fetching kindness acts:', error);
            }
        };

        fetchKindnessActs();
    }, []);

    return (
        <div className="home-container">
            <div className="globe-container">
                <Globe kindnessActs={kindnessActs} />
            </div>
            {/* ... rest of your homepage content */}
        </div>
    );
};

export default HomePage; 