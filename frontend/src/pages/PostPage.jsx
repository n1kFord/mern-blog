import React, {useCallback} from 'react';
import Moment from "react-moment";
import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from "react-icons/ai";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {clearStatus, createPost, removePost} from "../redux/features/post/postSlice";
import DeletePopup from "../components/DeletePopup";
import {checkIsError} from "../utils/checkIsError";
import {createComment, getPostComments} from "../redux/features/comment/commentSlice";
import CommentItem from "../components/CommentItem";

const PostPage = () => {
    const [post, setPost] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true);

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const [comment, setComment] = React.useState('');

    const {user} = useSelector(state => state.auth);
    const {status} = useSelector(state => state.post);
    const {comments} = useSelector(state => state.comment);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchPost = useCallback(async () => {
        setIsLoading(true);
        const {data} = await axios.get(`posts/${params.id}`);
        setIsLoading(false);
        setPost(data);
    }, [params.id]);

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (e) {
            toast(e, {autoClose: 2500, type: "error"})
        }
    }, [params.id, dispatch])

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id));
            navigate("/");
        } catch (e) {
            toast(e, {autoClose: 2500, type: "error"})
        }
    }

    const handleSubmit = () => {
        try {
            if (comment.length === 0) {
                toast("Error: Comment can't be empty", {autoClose: 2500, type: "error"})
            } else {
                const postId = params.id;
                dispatch(createComment({postId, comment}));
                setComment('');
            }
        } catch (e) {
            toast(e, {autoClose: 2500, type: "error"})
        }
    }

    React.useEffect(() => {
        if (status) {
            const toastType = checkIsError(status) ? "error" : "default";
            toast(status, {autoClose: 2500, type: toastType})
            dispatch(clearStatus())
        }
    }, [status])

    React.useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    React.useEffect(() => {
        fetchComments();
    }, [fetchComments]);


    if (!post?.title && isLoading === false) {
        return (
            <div
                className="flex flex-col mx-auto mt-[180px] justify-center items-center border-gray-500 border-2 p-2 w-[300px]">
                <h2 className="text-white text-lg cursor-default">404 Not Found</h2>
            </div>
        )
    }

    return (
        <div className="pb-[150px]">
            <Loader isLoading={isLoading}/>
            {post?.title && (
                <>
                    <DeletePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}
                                 onDelete={removePostHandler}/>
                    <div className="flex gap-10 py-8">
                        <div className="w-2/3">
                            <div className="flex flex-col basis-1/4 flex-grow">
                                <div className={
                                    post.imgUrl ? "flex rounded-sm h-[320px]" : "flex rounded-sm"
                                }>
                                    {post.imgUrl && (
                                        <img src={`http://localhost:3002/${post.imgUrl}`} alt={post.title}
                                             className="object-cover w-full"/>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <p className="text-xs text-white opacity-50">{post.username}</p>
                                <p className="text-xs text-white opacity-50">
                                    <Moment date={post.createdAt} format="D MMM YYYY"/>
                                </p>
                            </div>
                            <h3 className="text-white text-xl w-full max-w-[800px] overflow-hidden text-ellipsis">{post.title}</h3>
                            <p className="text-xs text-white opacity-60 pt-4 break-words">{post.text}</p>

                            <div className="flex gap-3 items-center mt-2 justify-between">
                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="flex items-center justify-center gap-2 text-xs text-white opacity-50 hover:opacity-75 transition">
                                        <AiFillEye/> <span>{post.views}</span>
                                    </button>
                                    <button
                                        className="flex items-center justify-center gap-2 text-xs text-white opacity-50 hover:opacity-75 transition">
                                        <AiOutlineMessage/> <span>{post.comments?.length}</span>
                                    </button>
                                </div>

                                {
                                    user?._id === post.author && (
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                className="flex items-center justify-center gap-2 text-white opacity-50 hover:opacity-75 transition">
                                                <Link to={`/${params.id}/edit`}>
                                                    <AiTwotoneEdit/>
                                                </Link>
                                            </button>
                                            <button
                                                className="flex items-center justify-center gap-2 text-white opacity-50 hover:opacity-75 transition"
                                                onClick={() => setIsPopupOpen(true)}
                                            >
                                                <AiFillDelete/>
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="w-1/3 p-8 bg-gray-700 flex-col gap-2 rounded-sm">
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="comment"
                                       value={comment}
                                       onChange={(e) => setComment(e.target.value)}
                                       maxLength={45}
                                       className="text-black w-full rounded-sm bg-gray-400 border-0 p-2 text-xs outline-none placeholder:text-gray-700"
                                />
                                <button type="submit"
                                        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                                        onClick={handleSubmit}
                                >
                                    send
                                </button>
                            </form>
                            {comments?.map((cmt) => {
                                return <CommentItem key={cmt._id} cmt={cmt}/>
                            })}
                        </div>
                    </div>

                    <Link to={"/"}
                          className="flex w-[70px] justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:opacity-75 transition">
                        Back
                    </Link>
                </>
            )}
        </div>
    );
};

export default PostPage;