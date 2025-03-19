import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('/api/get/posts');
            setResources(response.data.data);
        } catch (err) {
            setError('Failed to fetch resources.');
            console.error(err);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file || !title || !content) {
            setError('Title, content, and file are required.');
            return;
        }


        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('content', content);

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/create/post', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle('');
            setContent('');
            setFile(null);
            setComment('');
            fetchResources();
        } catch (err) {
            setError('Failed to upload resource.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/delete/post/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResources(resources.filter((resource) => resource.id !== id));
        } catch (err) {
            setError('Failed to delete resource.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Admin Resources</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleFileUpload} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter resource title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                />
                <textarea
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                ></textarea>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="p-2 border rounded w-full mb-2"
                />
                <textarea
                    placeholder="Add a comment (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
                >
                    Upload Resource
                </button>
            </form>

            <table className="w-full border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Content</th>
                    <th className="border p-2">File</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {resources.map((resource) => (
                    <tr key={resource.id}>
                        <td className="border p-2">{resource.title}</td>
                        <td className="border p-2">{resource.content}</td>
                        <td className="border p-2">
                            <a
                                href={`http://localhost:5000${resource.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                View File
                            </a>

                        </td>
                        <td className="border p-2 text-center">
                            <button
                                onClick={() => handleDelete(resource.id)}
                                className="bg-red-600 text-white p-1 rounded hover:bg-red-700">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Resources;