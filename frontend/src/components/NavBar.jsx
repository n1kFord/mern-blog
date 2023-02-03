import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

const NavBar = () => {

    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const activeStyles = {
        color: "white"
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem("token")
        navigate("/login")
        toast("You have successfully logged out", {autoClose: 1200})
    }

    return (
        <div className="flex py-4 justify-between items-center">
            <Link to="/"
                  className="flex justify-center items-center w-20 h-6 bg-gray-600 text-xs text-white rounded-sm">mern-blog</Link>
            {isAuth && (
                <ul className="flex gap-8">
                    <li>
                        <NavLink to="/" className="text-xs text-gray-400 hover:text-white transition"
                                 style={({isActive}) =>
                                     isActive ? activeStyles : undefined
                                 }>Main</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts" className="text-xs text-gray-400 hover:text-white transition"
                                 style={({isActive}) =>
                                     isActive ? activeStyles : undefined
                                 }>My posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new" className="text-xs text-gray-400 hover:text-white transition"
                                 style={({isActive}) =>
                                     isActive ? activeStyles : undefined
                                 }>Add post</NavLink>
                    </li>
                </ul>
            )}
            <div
                className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 hover:opacity-70 transition">
                {isAuth ? (
                    <button onClick={logoutHandler}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}

            </div>
        </div>
    );
};

export default NavBar;