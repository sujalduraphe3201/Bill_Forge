import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("Token not found");
                    navigate("/signup");
                    return;
                }

                const res = await axios.get("http://localhost:3000/api/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.user);
            } catch (error) {
                console.error("Unauthorized or error fetching user:", error);
                navigate("/signup");
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-10">Dashboard</h1>
            {user ? (
                <div className="mt-6 text-center">
                </div>
            ) : (
                <div className="mt-6 text-center">
                    <p className="text-lg">Loading user data...</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
