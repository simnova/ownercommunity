import { PropArray } from "../../../../../seedwork/domain-seedwork/prop-array";
import { ValueObject, ValueObjectProps } from "../../../../../seedwork/domain-seedwork/value-object";
import { Transaction, TransactionProps, TransactionReference } from "./transaction";

export interface WalletProps extends ValueObjectProps {
  customerId: string;
  readonly transactions: PropArray<TransactionProps>;
}

export interface WalletEntityReference extends Readonly<Omit<WalletProps, | 'transactions'>> {
  transactions: ReadonlyArray<TransactionReference>;
}
export class Wallet extends ValueObject<WalletProps> implements WalletEntityReference {
  constructor(props: WalletProps) {
    super(props);
  }

  get customerId() {
    return this.props.customerId;
  }
  get transactions(): ReadonlyArray<Transaction> {
    return this.props.transactions.items.map((transaction) => new Transaction(transaction));
  }

  requestAddTransaction(transaction: Transaction): void {
    this.props.transactions.addItem(transaction.props);
  }

  requestNewTransaction() {
    return new Transaction(this.props.transactions.getNewItem());
  }
}