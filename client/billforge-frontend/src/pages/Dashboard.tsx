import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type UserType = {
    id: string;
    username: string;
    email: string;
    tenantId: string;
    tenantName: string;
};
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);


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
                <div className="mt-6 text-center space-y-2">
                    <p className="text-lg font-medium">Welcome, <span className="text-blue-600">{user.username}</span>!</p>
                    <p>Email: <span className="text-gray-700">{user.email}</span></p>
                    <p>Tenant: <span className="text-green-700">{user.tenantName}</span></p>
                    <p>User ID: <span className="text-sm text-gray-500">{user.id}</span></p>
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
