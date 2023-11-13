module.exports = {
  handleError: (err, res) => {
    console.error(err);
    return res.status(500).json({
      error: err,
    });
  },
};
