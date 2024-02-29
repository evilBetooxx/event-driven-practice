import express from 'express';
import signale from 'signale';
import { PaymentRouter } from './payment/infrastructure/payment.routes';

const port = process.env.PORT || 3001;

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.use('/payment', PaymentRouter);

app.listen(port, () => {
    signale.success(`Server running on port ${port}`);
});