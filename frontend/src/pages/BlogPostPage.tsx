import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Typography, CardMedia } from '@mui/material';
import { getPostById } from '../api/strapiApi';
import { Post } from '../components/interfaces/post';
import PrimaryContentRenderer from '../components/methods/post';

const BlogPostPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		if (id) {
			getPostById(id)
				.then(data => setPost(data))
				.catch(err => console.error('Error fetching post:', err));
		}
	}, [id]);

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<Box component="main" sx={{ p: 2 }}>
				<CardMedia sx={{ borderRadius: '16px' }} component="img" height="300" image={"http://localhost:1337" + (post.cover || [{ url: "" }])[0]?.url} alt={post.title} />
				<Typography variant="h4" sx={{ mt: 2 }}>{post.title}</Typography>
				<Typography variant="subtitle2" color="textSecondary">
					{new Date(post.publishedAt).toLocaleDateString()} - Tags: {post.tags.join(', ')}
				</Typography>
				<Typography align='left'>
					{post.content.map((content) => PrimaryContentRenderer({ content }))}
				</Typography>
			</Box>
			<Footer />
		</>
	);
};

export default BlogPostPage;