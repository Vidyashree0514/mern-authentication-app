
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('Loading profile...');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(
                    'http://localhost:5000/api/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(response.data.user);
                setMessage('');

            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>

            {message && <p>{message}</p>}

            {user && (
                <div>
                    <h3>Welcome!</h3>
                    <p>Email: {user.email}</p>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
