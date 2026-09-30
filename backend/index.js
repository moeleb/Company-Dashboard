const express = require('express');
const connectDB = require('./utils/mongoose_connection.js');
const authRouter = require('./routers/authRouter.js');
const clientRouter = require('./routers/clientRequestRouter.js');
const cors = require('cors');





const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();


app.use('/api/auth', authRouter);
app.use('/api/client-requests', clientRouter);

const port = process.env.PORT || 3000;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

