/**
 * Reach out to the reddit API, and get the first page of results from
 * r/greentext. Filter out posts without readily available images or videos,
 * and return a random result.
 * @returns The url of an image or video which is a greentext.
 */
export async function getCuteUrl() {
  const response = await fetch('https://www.reddit.com/r/greentext/hot.json', {
    headers: {
      'User-Agent': 'd4rkr4in:greentextbot:v1.0.0 (by /u/d4rkr4in)',
    },
  });
  const data = await response.json();
  const posts = data.data.children
    .map((post) => {
      if (post.is_gallery) {
        return '';
      }
      return (
        post.data?.media?.reddit_video?.fallback_url ||
        post.data?.secure_media?.reddit_video?.fallback_url ||
        post.data?.url
      );
    })
    .filter((post) => !!post);
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  return randomPost;
}
