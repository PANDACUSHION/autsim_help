import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('timestamp');
    const [order, setOrder] = useState('desc');

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/get/posts', {
                params: { page, limit, sortBy, order },
            });
            if (response.data.success) {
                setPosts(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
                setError('');
            } else {
                setError('Failed to fetch posts. Please try again later.');
            }
        } catch (err) {
            setError('Failed to fetch posts. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, sortBy, order]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-lg text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-lg">{error}</div>
                    <button className="mt-4 btn btn-primary" onClick={fetchPosts}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
                <div className="flex justify-end mb-4">
                    <select
                        className="p-2 border rounded mr-2"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="timestamp">Date</option>
                        <option value="title">Title</option>
                        <option value="user_id">User</option>
                    </select>
                    <select
                        className="p-2 border rounded"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                <p className="text-gray-700 mb-4">{post.content}</p>
                                {post.file_path && (
                                    <div className="mb-4">
                                        <a
                                            href={`http://localhost:5000${post.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Images
                                        </a>
                                    </div>
                                )}
                                <div className="text-sm text-gray-500">
                                    <p>Posted by: {post.user?.name || 'Unknown'}</p>
                                    <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="btn btn-outline mr-2"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 border rounded">Page {page} of {totalPages}</span>
                    <button
                        className="btn btn-outline ml-2"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
