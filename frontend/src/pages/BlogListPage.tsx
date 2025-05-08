// src/pages/BlogListPage.tsx
import React, { useEffect, useState } from 'react';
import {
	Container,
	Grid,
	Typography,
	Box,
	Card,
	CardMedia,
	CardContent,
	TextField,
	Autocomplete,
	CircularProgress,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPosts } from '../api/strapiApi';
import { Post } from '../components/interfaces/post';

const BlogListPage: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [allTags, setAllTags] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getPosts()
			.then((data) => {
				data = data.toReversed().map(Post.toPost);
				console.log(data)
				setPosts(data);
				setFilteredPosts(data);
				// Extract unique tags from posts
				const tags = Array.from(new Set<string>(data.flatMap((post: Post) => post.tags.map(tag => tag.name))));
				setAllTags(tags);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching posts:', err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		let filtered = posts;

		if (searchQuery) {
			filtered = filtered.filter((post) =>
				post.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((post) =>
				selectedTags.every((tag) => post.tags.map(tag => tag.name).includes(tag))
			);
		}

		setFilteredPosts(filtered);
	}, [searchQuery, selectedTags, posts]);

	return (
		<div>
			<Header />

			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Typography variant="h4" gutterBottom>
					Blog Posts
				</Typography>

				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, justifyContent: 'center', alignItems: 'center' }}>
					<TextField
						label="Search by title"
						variant="outlined"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={{ minWidth: 300 }}

					/>

					<Autocomplete
						multiple
						options={allTags}
						getOptionLabel={(option) => option}
						value={selectedTags}
						onChange={(_, newValue) => {
							setSelectedTags(newValue);
						}}
						renderInput={(params) => (
							<TextField {...params} variant="outlined" label="Filter by tags" />
						)}
						sx={{ minWidth: 300 }}
					/>
				</Box>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
						<CircularProgress />
					</Box>
				) : (
					<Grid container spacing={4}>
						{filteredPosts.map((post) => (
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
				)}
			</Container>

			<Footer />
		</div>
	);
};

export default BlogListPage;
