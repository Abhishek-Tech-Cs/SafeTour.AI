import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {User, Mail, Phone, Lock, Eye, EyeOff} from 'lucide-react'

import {register} from '../services/auth.service'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering,setIsRegistering] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData,setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  })

  function handleChange(e){
    const {name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  async function handleSubmit(e){
    e.preventDefault()
    setErrors({})
    if (formData.confirmPassword !== formData.password) {
        setErrors({
            confirmPassword: "Passwords do not match",
        });
        return;
    }
    setIsRegistering(true);

    try{
      const {confirmPassword,...registerData}=formData
      await register(registerData)
      navigate('/login')
    }catch (error) {
        const response = error.response?.data;

        // express-validator errors
        if (response?.errors) {
            const fieldErrors = {};

            response.errors.forEach((item) => {
                fieldErrors[item.field] = item.message;
            });

            setErrors(fieldErrors);
            return;
        }

        // duplicate email/mobile errors
        const message = response?.message;

        if (message === "Email is already registered") {
            setErrors({
                email: message,
            });
        } else if (message === "Mobile number is already registered") {
            setErrors({
                mobileNumber: message,
            });
        } else {
            setErrors({
                form: message || "Registration failed. Please try again.",
            });
        }
    }finally{
      setIsRegistering(false)
    }
  }
  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
            Create account
        </h1>

        <p className="mt-1 text-sm text-slate-500">
            Join SafeTour.AI today
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <Input 
            label="Name"
            type="text" 
            name="name" 
            placeholder="Enter name..." 
            required={true} 
            value={formData.name} 
            onChange={handleChange}
            icon={<User size={18} />} 
            error={errors.name}
        />
        <Input 
            label="Email"
            type="email" 
            name="email" 
            placeholder="Enter email..." 
            required={true} 
            value={formData.email} 
            onChange={handleChange} 
            icon={<Mail size={18} />}
            error={errors.email}
        />
        <Input 
            label="Mobile number"
            type="tel" 
            name="mobileNumber" 
            placeholder="Enter mobile number..." 
            required={true} 
            value={formData.mobileNumber} 
            onChange={handleChange} 
            icon={<Phone size={18} />}
            error={errors.mobileNumber}
        />
        <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a password..."
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
            error={errors.password}
        />
        <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password..."
            required={true}
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={<Lock size={18} />}
            rightElement={
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    {showConfirmPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            }
            error={errors.confirmPassword}
        />
        <label className="mb-5 flex items-start gap-2 text-sm text-gray-600">
            <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300"
            />

            <span>
                I agree to the{" "}
                <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-700"
                >
                    Terms of Service
                </button>{" "}
                and{" "}
                <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-700"
                >
                    Privacy Policy
                </button>
            </span>
        </label>
        {errors.form && (
            <p className="mb-4 text-center text-sm text-red-500">
                {errors.form}
            </p>
        )}
        <Button type='submit' disabled={isRegistering}>{isRegistering?"Registering...":"Register"}</Button>
        <div className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium cursor-pointer text-purple-600 hover:text-purple-700"
            >
                Login
            </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm