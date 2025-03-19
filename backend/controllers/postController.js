const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new post with optional file attachment
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const uniqueString = req.fileIdentifier;
        console.log(uniqueString);
        // Handle file upload
        const fileUrl = req.file ? `/uploads/${uniqueString}` : "";
        const user_id = req.user.id;
        console.log(user_id);
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                user_id: parseInt(user_id),
                file_path: fileUrl,  // Ensuring consistency with Prisma schema
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all posts with optional pagination, filtering, and sorting
exports.getAllPosts = async (req, res) => {
    try {
        // Extract query parameters
        const { page = 1, limit = 10, userId, sortBy = 'timestamp', order = 'desc' } = req.query;

        // Calculate pagination offset
        const offset = (page - 1) * limit;

        // Define filters
        const filters = {};
        if (userId) {
            filters.user_id = parseInt(userId); // Filter by user ID
        }

        // Define sorting
        const sorting = {};
        if (['title', 'timestamp', 'user_id'].includes(sortBy)) {
            sorting[sortBy] = order === 'asc' ? 'asc' : 'desc'; // Sort by field and order
        }

        // Fetch posts with user details, pagination, filtering, and sorting
        const posts = await prisma.post.findMany({
            where: filters, // Apply filters
            orderBy: sorting, // Apply sorting
            skip: offset, // Pagination offset
            take: parseInt(limit), // Number of posts per page
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        // Get total count of posts (for pagination)
        const totalPosts = await prisma.post.count({ where: filters });

        // Send response with posts and pagination metadata
        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalPosts,
                totalPages: Math.ceil(totalPosts / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch posts. Please try again later.',
        });
    }
};
// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
