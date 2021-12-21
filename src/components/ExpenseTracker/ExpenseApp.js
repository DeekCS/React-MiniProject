import React, {useEffect, useState} from "react";
import {Container, Form, Button, Col} from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";


const ALL_EXPENSES = localStorage.getItem('expenses')
    ? JSON.parse(localStorage.getItem('expenses'))
    : []

const ExpenseApp = ({isSuccess,setIsSuccess}) => {
    let [randomID, setRandomID] = useState(0);
    const [expenses, setExpenses] = useState(ALL_EXPENSES);
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const handleName = event => {
        console.log('Name ', event.target.value)
        setName(event.target.value)
    }

    const handleAmount = event => {
        console.log('Amount ', event.target.value)
        setAmount(event.target.value)
    }

    const handleDate = event => {
        console.log('Date ', event.target.value)
        setDate(event.target.value)
    }


    const handleSubmitForm = event => {
        event.preventDefault()
       if (isSuccess) {
           randomID = Math.floor(Math.random() * 100);
           if (name !== '' && amount > 0) {
               const expense = {name, amount, id: randomID, date}
               setExpenses([...expenses, expense])
               setName('')
               setAmount('')
               setRandomID(randomID + 1)
               setDate('')
           } else {
               alert('Invalid expense name or the amount')
           }
       }
       else {
           alert('Please Login To Add expense')
       }
    }

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    const handleClearExpenses = () => {
        setExpenses([])
    }

    const handleDeleteExpense = id => {
        setExpenses(expenses.filter(expense => expense.id !== id))
    }

    return (
        <Container className="text-center">
            <div className="bg-info ">
                <h1>Expense Tracker</h1>
                <div>
                    <p>
                        Total Expense:{' '}
                        <span className="text-success">
                          ${' '}
                            {expenses.reduce((accumulator, currentValue) => {
                                return (accumulator + parseInt(currentValue.amount))
                            }, 0)}
            </span>
                    </p>
                </div>
                <ExpenseForm
                    name={name}
                    amount={amount}
                    handleName={handleName}
                    handleAmount={handleAmount}
                    handleSubmitForm={handleSubmitForm}
                    handleClearExpenses={handleClearExpenses}
                    handleDate={handleDate}


                />
                {/*If there is no data dont show table*/}

            </div>
            {expenses.length > 0 && <ExpenseList expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>}
        </Container>
    )
};

export default ExpenseApp;
