import React from 'react';
import loadingImage from "../vendor/images/loading.svg"

const Loader = ({isLoading, extraClasses = ''}) => {
    const loadingClass = isLoading ? 'animate-spin' : 'hidden';

    return (
        <img src={loadingImage} alt="loading" className={`w-5 mx-auto m-10  ${loadingClass} ${extraClasses}`}/>
    )
};

export default Loader;