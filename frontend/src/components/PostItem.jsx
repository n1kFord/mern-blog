import React from 'react';
import {AiFillEye, AiOutlineMessage} from "react-icons/ai";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const PostItem = ({post}) => {

    return (
        <div
            className="flex flex-col first:border-t-0 first:pt-0 basis-1/4 flex-grow pt-10 border-t-gray-700 border-t-[1px]">
            <div className={
                post?.imgUrl ? "flex rounded-sm h-[320px]" : "flex rounded-sm"
            }>
                {post?.imgUrl && (
                    <img src={`http://localhost:3002/${post?.imgUrl}`} alt={post?.title}
                         className="object-cover w-full"/>
                )}
            </div>
            <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-white opacity-50">{post?.username}</p>
                <p className="text-xs text-white opacity-50">
                    <Moment date={post?.createdAt} format="D MMM YYYY"/>
                </p>
            </div>
            <h3 className="text-white text-xl w-full max-w-[300px] overflow-hidden text-ellipsis">{post?.title}</h3>
            <p className="text-xs text-white opacity-60 pt-4 line-clamp-4 break-words w-full max-w-[768px]">{post?.text}</p>

            <div className="flex gap-3 items-center mt-2">
                <button
                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50 hover:opacity-75 transition">
                    <AiFillEye/> <span>{post?.views}</span>
                </button>
                <button
                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50 hover:opacity-75 transition">
                    <AiOutlineMessage/> <span>{post?.comments?.length}</span>
                </button>
            </div>
            <Link
                className="mt-[15px] w-[100px] flex justify-center items-center text-xs bg-gray-700 text-white rounded-sm py-2 px-4 transition hover:opacity-80"
                to={`/${post?._id}`}
            >
                open
            </Link>
        </div>
    );
};

export default PostItem;