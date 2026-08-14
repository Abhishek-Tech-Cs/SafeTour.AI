import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import {login} from '../services/auth.service'
import useAuth from '../../../hooks/useAuth'


const LoginForm = () => {
    const navigate = useNavigate()
    const {setUser} = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    function handleChange(e){
        const {name,value}=e.target 
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try{
            const data = await login(formData)
            setUser(data.data.user)
            navigate('/dashboard')
        }catch(error) {
            setError(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome back
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Login to your account
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <Input 
                    label="Email"
                    type="email" 
                    name="email" 
                    placeholder="Enter email..." 
                    required={true} 
                    value={formData.email} 
                    onChange={handleChange} 
                    icon={<Mail size={18} />}
                />
                <Input 
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    placeholder="Enter password..." 
                    required={true} 
                    value={formData.password}  
                    onChange={handleChange}
                    icon={<Lock size={18} />}
                    rightElement={
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    }
                />
                <div className="mb-5 flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        Remember me
                    </label>

                    <button
                        type="button"
                        className="font-medium cursor-pointer text-purple-600 hover:text-purple-700"
                    >
                        Forgot password?
                    </button>
                </div>
                {error && (
                    <p className="mb-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <div className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="font-medium text-purple-600 cursor-pointer hover:text-purple-700"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm