import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, clearStatus, loginUser} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import {checkIsError} from "../utils/checkIsError";
import Loader from "../components/Loader";

const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {status, loading} = useSelector(state => state.auth);
    const isAuth = useSelector(checkIsAuth)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    React.useEffect(() => {
        if (status) {
            const toastType = checkIsError(status) ? "error" : "default";
            toast(status, {autoClose: 2500, type: toastType});
            dispatch(clearStatus());
        }
        isAuth ? navigate("/") : setPassword("")
    }, [status, isAuth])

    const handleSubmit = (e) => {
        try {
            dispatch(loginUser({username, password}))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}
              className="w-1/4 h-60 mx-auto mt-40"
        >
            <h1 className="text-lg text-white text-center mt-15">Authorization</h1>
            <label className="text-xs text-gray-400">Username:
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
            </label>

            <label className="text-xs text-gray-400">Password:
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
            </label>
            <div className="flex gap-8 justify-center mt-10">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 transition hover:opacity-80"
                >
                    Login
                </button>
                <Link
                    to="/register"
                    className="flex justify-center items-center text-xs text-white transition hover:opacity-80"
                >
                    Don't have an account yet? Register</Link>
            </div>

            <Loader isLoading={loading}/>
        </form>
    );
};

export default LoginPage;