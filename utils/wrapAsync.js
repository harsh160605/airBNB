module.exports = (fn) => {
    return (req, res, next) => {   // ✅ MUST include next
        fn(req, res, next).catch(next);  // ✅ use next
    };
};