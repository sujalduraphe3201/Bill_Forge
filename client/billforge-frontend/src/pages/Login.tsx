import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/login", { email, password });
            setResponse("Login successful ✅");
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.log("error while logging in", error);
            setResponse("Login failed ❌. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white  p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-xl font-bold text-center mb-6 text-purple-600">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Sign In
                </button>

                {response && (
                    <p className="mt-4 text-center text-sm text-red-600">{response}</p>
                )}
            </div>
        </div>


    );
};

export default Login;
