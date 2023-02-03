import React from 'react';
import {Link} from "react-router-dom";

const PopularPost = ({post}) => {
    return (
        <div className="bg-gray-600 w-full my-1">
            <Link to={`/${post._id}`}
                  className="flex text-xs p-2 text-gray-300 max-w-[200px] overflow-hidden text-ellipsis hover:text-white hover:bg-gray-700 transition">
                {post.title}
            </Link>
        </div>
    );
};

export default PopularPost;