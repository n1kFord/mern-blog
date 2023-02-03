import React from 'react';
import {useNavigate} from "react-router-dom";

const PrivateRoute = ({isSignedIn, children}) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isSignedIn) {
            return navigate("/login");
        }
    }, [isSignedIn, navigate]);
    if (isSignedIn) return children;
};

export default PrivateRoute;