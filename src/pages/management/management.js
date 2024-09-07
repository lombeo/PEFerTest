import React, { useEffect, useState } from 'react';
// import './management.css';

const Management = () => {
    const [players, setPlayers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetch('https://66dc82b347d749b72acbc25d.mockapi.io/api/v1/LongDDHE170376')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.id - a.id);
                setPlayers(sortedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        setPlayerToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        fetch(`https://66dc82b347d749b72acbc25d.mockapi.io/api/v1/LongDDHE170376/${playerToDelete}`, {
            method: 'DELETE',
        })
            .then(() => {
                setPlayers(players.filter(player => player.id !== playerToDelete));
                setShowConfirm(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch(error => console.error('Error deleting player:', error));
    };

    return (
        <div>
            <h1>Management Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Player Name</th>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.id}>
                            <td>{player.id}</td>
                            <td>{player.playerName}</td>
                            <td>{player.position}</td>
                            <td>{player.team}</td>
                            <td>
                                <button onClick={() => handleDelete(player.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this player?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={() => setShowConfirm(false)}>No</button>
                    </div>
                </div>
            )}

            {showToast && (
                <div className="toast">
                    <p>Player deleted successfully!</p>
                </div>
            )}
        </div>
    );
};

export default Management;
