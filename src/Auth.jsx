import { useState } from  "react";
import { supabase} from "./supabaseClient";

 function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error) setMessage(error.message)
            else setMessage("Check your email for a confirmation link!")
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const { error }  = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) setMessage(error.message)
            else setMessage("Logged in successfully!")
    }

    const handleOTP = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithOtp({
            email,
        })
        if (error) setMessage(error.message)
            else setMessage("Check your email for the login link!")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form className="bg-white shadow-md rounded p-6 w-80">
                <h2 className="text-2xl font-semibold mb-4 text-center">Sign In / Up</h2>

                <input
                    className="border w-full p-2 mb-3 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border w-full p-2 mb-3 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                            onClick={handleSignup}
                            >Sign Up
                        </button>

                        <button
                            className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
                            onClick={handleLogin}
                            >Login
                        </button>

                        <button
                            className="bg-purple-500 text-white rounded p-2 hover:purple-600"
                            onClick={handleOTP}
                            >Login With OTP
                        </button>

                    </div>

                    {message && (
                        <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
                    )}
            </form>
        </div>
    )
}
export default Auth;
