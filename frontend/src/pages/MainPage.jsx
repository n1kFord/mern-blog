import React from 'react';
import PostItem from "../components/PostItem";
import PopularPost from "../components/PopularPost";
import {useDispatch, useSelector} from "react-redux";
import {clearStatus, getAllPosts} from "../redux/features/post/postSlice";
import Loader from "../components/Loader";
import {checkIsError} from "../utils/checkIsError";
import {toast} from "react-toastify";
import {filterItems} from "../utils/filterItems";

const MainPage = () => {
    const dispatch = useDispatch();
    const {posts, popularPosts, loading, status} = useSelector(state => state.post);

    const [searchText, setSearchText] = React.useState("");
    const [localPosts, setLocalPosts] = React.useState([]);

    React.useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    React.useEffect(() => {
        if (checkIsError(status)) {
            toast(status, {autoClose: 2500, type: "error"})
        }
        dispatch(clearStatus());
    }, [status])

    React.useEffect(() => {
        setLocalPosts(posts);
    }, [posts])

    React.useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredPosts = filterItems(searchText, posts);
            setLocalPosts(filteredPosts);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [searchText])

    if (posts?.length === 0 && loading === false) {
        return (
            <div
                className="flex flex-col mx-auto mt-[180px] justify-center items-center">
                <h2 className="text-white text-lg cursor-default">No Posts yet.</h2>
            </div>
        )
    }

    return (
        <div className="max-w-[900px] mx-auto py-10">
            {loading ? <Loader isLoading={true}/> : (
                <div className="flex flex-col">
                    <input type="text" placeholder="search..."
                           maxLength={45}
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           className="m-auto mb-10 text-gray-300 w-full max-w-[400px] rounded-sm bg-gray-600 border-0 p-2 text-xs outline-none placeholder:text-gray-400 transition focus:shadow-md focus:text-gray-100"
                    />
                    {(localPosts.length === 0 && posts.length !== 0) && (
                        <h2 className="m-auto text-lg text-gray-200">Nothing found.</h2>
                    )}
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-10 basis-4/5">
                            {
                                localPosts?.map((post, i) => {
                                    return <PostItem key={i + "_post"} post={post}/>
                                })
                            }
                        </div>
                        <div className="basis-1/5">
                            <h2 className="text-xs uppercase text-white">Popular:</h2>
                            {
                                popularPosts?.map((post, i) => {
                                    return <PopularPost key={i + "_popular-post"} post={post}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;