import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/SafeTour.AI.png";
import authBg from "../assets/authBg.png"

const AuthLayout = () => {
    return (
          <div
            className="flex min-h-screen w-full flex-col items-center justify-between bg-cover bg-center bg-fixed px-4 py-6 text-white"
            style={{ backgroundImage: `url(${authBg})` }}
          >
            <header className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                    <img
                        src={logo}
                        alt="SafeTour.AI logo"
                        className="h-10 w-10"
                    />

                    <h1 className="text-2xl font-bold">
                        SafeTour.AI
                    </h1>
                </div>

                <p className="mt-1 ml-2 text-center text-bas">
                    Travel safer. Explore freely.
                </p>
            </header>

            <main className="flex w-full flex-1 items-center justify-center px-4 ">
                <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
                    <Outlet />
                </div>
            </main>

            <footer className=' pt-2'>
                <p>&copy; 2026 SafeTour.AI. All rights reserved.</p>
            </footer>

        </div>
    );
};

export default AuthLayout;