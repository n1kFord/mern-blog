import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearStatus, createPost, updatePost} from "../redux/features/post/postSlice";
import {checkIsError} from "../utils/checkIsError";
import {toast} from "react-toastify";
import Loader from "../components/Loader";
import axios from "../utils/axios";
import {useNavigate, useParams} from "react-router-dom";

const EditPostPage = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [oldImage, setOldImage] = React.useState('');
    const [newImage, setNewImage] = React.useState('');
    const activeClass = Boolean(title && text) ? 'hover:opacity-75 transition' : 'bg-gray-700 cursor-default';

    const {status, loading} = useSelector(state => state.post);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const fetchPost = useCallback(async () => {
        const {data} = await axios.get(`posts/${params.id}`);
        setTitle(data.title);
        setText(data.text);

    }, [params.id]);

    React.useEffect(() => {
        if (status) {
            const toastType = checkIsError(status) ? "error" : "default";
            toast(status, {autoClose: 2500, type: toastType})

            if (toastType) {
                clearForm();
            }

            dispatch(clearStatus())
            navigate(`/${params.id}`);
        }
    }, [status])

    React.useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const submitHandler = () => {
        try {
            if (title && text) {
                const updatedPost = new FormData();
                updatedPost.append('title', title);
                updatedPost.append('text', text);
                updatedPost.append('id', params.id);
                updatedPost.append('image', newImage);
                dispatch(updatePost(updatedPost));
            }
        } catch (e) {
            toast(e, {autoClose: 2500, type: "error"})
        }
    }

    const clearForm = () => {
        setTitle('');
        setText('');
    }

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <label
                className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer hover:opacity-75 transition'>
                Attach image
                <input type="file" className="hidden" onChange={(e) => {
                    setNewImage(e.target.files[0]);
                    setOldImage('')
                }}/>
            </label>
            {oldImage && (
                <div className="mx-auto flex justify-center  object-cover py-3 h-[250px]">
                    <img src={`http://localhost:3002/${oldImage}`} alt={"post image"}
                         className="opacity-40 cursor-pointer hover:opacity-100 transition duration-200"/>
                </div>
            )}
            {newImage && (
                <div className="mx-auto flex justify-center  object-cover py-3 h-[250px]">
                    <img src={URL.createObjectURL(newImage)} alt={"post image"}
                         className="opacity-40 cursor-pointer hover:opacity-100 transition duration-200"/>
                </div>
            )}

            <label className="text-xs text-white opacity-70">
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={25}
                    placeholder="title"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>

            <label className="text-xs text-white opacity-70">
                Text
                <textarea
                    placeholder="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs resize-none h-40 outline-none placeholder:text-gray-700"
                />
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    className={`${activeClass} flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 w-3/4`}
                    onClick={submitHandler}
                >
                    Edit post
                </button>
                <button
                    className="flex items-center justify-center bg-red-500 text-xs text-white rounded-sm py-2 px-4 w-1/4 hover:opacity-75 transition"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </div>
            <Loader isLoading={loading}/>
        </form>
    );
};

export default EditPostPage;