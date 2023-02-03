import React from 'react';

const CommentItem = ({cmt}) => {
    return (
        <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center justify-center shrink-0 w-5 h-5 bg-blue-800 text-sm"></div>
            <p
                className="flex text-gray-300 text-[10px] break-words w-full max-w-[330px] overflow-hidden text-ellipsis">
                {cmt.comment}
            </p>
        </div>
    );
};

export default CommentItem;