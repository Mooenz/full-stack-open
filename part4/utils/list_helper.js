const dummy = (blogs) => {
	console.log(blogs);
	return blogs.body.length;
};

const totalLikes = (blogs) => {
	const { _body } = blogs;
	const total = _body.reduce((sum, blog) => sum + blog.likes, 0);
	return total;
};

const favoriteBlog = (blogs) => {
	const { _body } = blogs;
	const favorite = _body.reduce((prev, current) => (prev.likes > current.likes ? prev : current), _body[0]);
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
};

const listHelper = {
	dummy,
	totalLikes,
	favoriteBlog,
};

export default listHelper;
