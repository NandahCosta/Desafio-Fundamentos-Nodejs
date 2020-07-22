import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions =  transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    //pegamos os dados no corpo
     const {title, value , type} = request.body;
     //criamos o transaction service
     const createTransaction = new CreateTransactionService(
       transactionsRepository
     );
      // executo o metodo execute - onde realmente vai criar nossa transação
     const transaction = createTransaction.execute({
      title,
      value,
      type,
     });
     return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
