import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './detail.css';

const Detail = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetch(`https://66dc82b347d749b72acbc25d.mockapi.io/api/v1/LongDDHE170376/${id}`)
            .then(response => response.json())
            .then(data => setPlayer(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!player) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="player-detail">
            <h1>{player.playerName}</h1>
            <div className="player-info">
                <img src={player.image} alt={player.playerName} className="player-image" />
                <div className="player-stats">
                    <p><strong>Position:</strong> {player.position}</p>
                    <p><strong>Team:</strong> {player.team}</p>
                    <p><strong>Minutes Played:</strong> {player.minutesPlayed}</p>
                    <p><strong>Passing Accuracy:</strong> {player.PassingAccuracy * 100}%</p>
                    <p className={`ribbon ${player.isCaptain ? 'captain' : ''}`}>
                        {player.isCaptain ? "Captain" : "Not Captain"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
