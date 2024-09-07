import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('https://66dc82b347d749b72acbc25d.mockapi.io/api/v1/LongDDHE170376')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Players</h1>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        <Link to={`/detail/${player.id}`}>{player.playerName}</Link>
                        <p>Position: {player.position}</p>
                        <p>Captain: {player.isCaptain ? "Yes" : "No"}</p>
                        <img src={player.image} alt={player.playerName} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
