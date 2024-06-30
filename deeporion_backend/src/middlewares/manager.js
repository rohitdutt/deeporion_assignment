exports.isManager = (req, res, next) => {
    const isManager = req.headers['role'] === 'manager';
    if (!isManager) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};