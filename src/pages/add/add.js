import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [formData, setFormData] = useState({
        playerName: '',
        minutesPlayed: '',
        position: 'Midfielder',
        isCaptain: false,
        image: '',
        team: '',
        PassingAccuracy: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!formData.playerName || formData.playerName.split(' ').length < 2 || formData.playerName !== formData.playerName.toUpperCase()) {
            errors.playerName = 'Player name must be more than 1 word and uppercase.';
        }
        if (!formData.minutesPlayed || isNaN(formData.minutesPlayed)) {
            errors.minutesPlayed = 'Minutes played must be a number.';
        }
        if (!formData.image || !/^https?:\/\/.+\..+/.test(formData.image)) {
            errors.image = 'Image must be a valid URL.';
        }
        if (!formData.team) {
            errors.team = 'Team is required.';
        }
        if (!formData.PassingAccuracy || isNaN(formData.PassingAccuracy)) {
            errors.PassingAccuracy = 'Passing accuracy must be a number.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch('https://66dc82b347d749b72acbc25d.mockapi.io/api/v1/LongDDHE170376', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(() => {
                    navigate('/admin');
                })
                .catch(error => console.error('Error adding player:', error));
        }
    };

    return (
        <div>
            <h1>Add Player</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Player Name:</label>
                    <input type="text" name="playerName" value={formData.playerName} onChange={handleChange} />
                    {errors.playerName && <p className="error">{errors.playerName}</p>}
                </div>
                <div>
                    <label>Minutes Played:</label>
                    <input type="number" name="minutesPlayed" value={formData.minutesPlayed} onChange={handleChange} />
                    {errors.minutesPlayed && <p className="error">{errors.minutesPlayed}</p>}
                </div>
                <div>
                    <label>Position:</label>
                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="Midfielder">Midfielder</option>
                        <option value="Forward">Forward</option>
                        <option value="Defender">Defender</option>
                        <option value="Goalkeeper">Goalkeeper</option>
                    </select>
                </div>
                <div>
                    <label>Is Captain:</label>
                    <input type="checkbox" name="isCaptain" checked={formData.isCaptain} onChange={handleChange} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>
                <div>
                    <label>Team:</label>
                    <input type="text" name="team" value={formData.team} onChange={handleChange} />
                    {errors.team && <p className="error">{errors.team}</p>}
                </div>
                <div>
                    <label>Passing Accuracy:</label>
                    <input type="number" name="PassingAccuracy" value={formData.PassingAccuracy} onChange={handleChange} />
                    {errors.PassingAccuracy && <p className="error">{errors.PassingAccuracy}</p>}
                </div>
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default Add;
