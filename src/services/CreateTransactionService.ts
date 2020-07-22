import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value:  number;
  type: 'income' |'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:Request): Transaction {
    // TODO -- validar se o valor inserido é valido - segurança
    if(!["income", "outcome"].includes(type)){
      throw new Error ('Infelizmente este tipo de transação não é permitida');
    }

    const {total} = this.transactionsRepository.getBalance();

    if(type === "outcome" && total < value){
      throw new Error ('Dim Dim Cabou :(')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
