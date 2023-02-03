import React from 'react';
import axios from "../utils/axios";
import Loader from "../components/Loader";
import {checkIsError} from "../utils/checkIsError";
import {toast} from "react-toastify";
import PostItem from "../components/PostItem";
import {clearStatus} from "../redux/features/post/postSlice";
import {useDispatch} from "react-redux";

const PostsPage = () => {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const dispatch = useDispatch();


    const fetchMyPosts = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get('/posts/me');
            if (data.message) {
                toast(data.message, {autoClose: 2500, type: "error"})
                setIsLoading(false);
                dispatch(clearStatus())
            } else {
                setIsLoading(false);
                setPosts(data.reverse());
            }
        } catch (e) {
            toast(e, {autoClose: 2500, type: "error"})
        }
    }

    React.useEffect(() => {
        fetchMyPosts();
    }, []);


    if (posts?.length === 0 && isLoading === false) {
        return (
            <div
                className="flex flex-col mx-auto mt-[180px] justify-center items-center">
                <h2 className="text-white text-lg cursor-default">You don't have any posts :(</h2>
            </div>
        )
    }

    return (

        <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
            {isLoading ? <Loader isLoading={isLoading}/> : (
                <>
                    {posts?.map((post, i) => {
                        return <PostItem post={post} key={"user_post" + i}/>
                    })}
                </>
            )}

        </div>
    );
};

export default PostsPage;