const dummy = (blogs) => {
    return 1;
};
const totalLikes = (blogs) => {
    const reducer = (sum, cv) => sum + cv.likes;
    if (blogs.length === 0) {
        return 0;
    } else {
        return blogs.reduce(reducer, 0);
    }
};
module.exports = {
    dummy,
    totalLikes
};