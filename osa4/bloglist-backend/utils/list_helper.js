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
const favouriteBlog = (blogs) => {
    const reducer  = (pv, cv) => (pv.likes > cv.likes) ? pv : cv;
    if (blogs.length === 0) {
        return null;
    } else {
        return blogs.reduce(reducer);
    }
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
};