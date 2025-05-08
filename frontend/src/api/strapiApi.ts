const BASE_URL = import.meta.env.VITE_STRAPI_API_URL;

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts?populate=*`);
  if (!response.ok) {
    throw new Error('Error fetching posts');
  }
  return (await response.json())["data"];
}

export async function getPostById(id: string) {
  const response = await fetch(`${BASE_URL}/posts/${id}?populate=*`);
  if (!response.ok) {
    throw new Error('Error fetching the post');
  }
  return (await response.json())["data"];
}

export async function getPostsByTag(tag: string) {
  const response = await fetch(`${BASE_URL}/posts?populate=*&tags_in=${tag}`);
  if (!response.ok) {
    throw new Error('Error fetching posts by tag');
  }
  return (await response.json())["data"];
}
