const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\nNode is running in ${process.env.NODE_ENV} mode and app listening on port ${PORT}`);
});
