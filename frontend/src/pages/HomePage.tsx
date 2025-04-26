import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
// import { borders } from '@mui/system';
import { getPosts } from '../api/strapiApi';
import { Post } from '../components/interfaces/post';

const HomePage: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		getPosts()
			.then(data => setPosts(data.map(Post.toPost)))
			.catch(err => console.error('Error fetching posts:', err));
	}, []);

	return (
		<>
			<Header />
			<Box component="main" sx={{ p: 2 }}>
				<Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Posts</Typography>
				<Grid container spacing={2}>
					{posts.toReversed().map(post => (
						<Grid key={post.id}>
							<a href={`/post/${post.id}`}>
								<Card>
									<CardMedia component="img" height="140" image={"http://localhost:1337" + (post.cover || [{ url: "" }])[0]?.url} alt={post.title} />
									<CardContent>
										<Typography sx={{
											display: '-webkit-box',
											overflow: 'hidden',
											WebkitBoxOrient: 'vertical',
											WebkitLineClamp: 3,
										}} maxWidth='300px' variant="body1">{post.title}</Typography>
									</CardContent>
								</Card>
							</a>
						</Grid>
					))}
				</Grid>
			</Box>
			<Footer />
		</>
	);
};

export default HomePage;