exports.getTransactions = (req, res, next) => {
  res.send("GET request");
};

exports.addTransaction = (req, res, next) => {
  res.send("POST request");
};

exports.deleteTransaction = (req, res, next) => {
  res.send("DELETE request");
};
