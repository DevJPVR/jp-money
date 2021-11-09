import { useTransactions } from '../../hooks/useTransactions';

import IncomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { Container } from "./styles";

export function Summary(){
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
    }else{
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
    }

    return acc;
    },{
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="Entradas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>SAIDAS</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>-
                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(summary.withdraws)}
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>TOTAL</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}