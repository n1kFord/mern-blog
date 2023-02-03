import React from "react";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditPostPage from "./pages/EditPostPage";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "./redux/features/auth/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth);

    React.useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/posts" element={
                    <PrivateRoute isSignedIn={Boolean(user)}>
                        <PostsPage/>
                    </PrivateRoute>
                }/>
                <Route path=":id" element={
                    <PrivateRoute isSignedIn={Boolean(user)}>
                        <PostPage/>
                    </PrivateRoute>
                }/>
                <Route path=":id/edit" element={
                    <PrivateRoute isSignedIn={Boolean(user)}>
                        <EditPostPage/>
                    </PrivateRoute>
                }/>
                <Route path="new" element={
                    <PrivateRoute isSignedIn={Boolean(user)}>
                        <AddPostPage/>
                    </PrivateRoute>
                }/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>

            <ToastContainer position='bottom-center' pauseOnHover theme="dark"/>
        </Layout>
    );
}

export default App;
