import React, {useEffect, useState} from "react";
import {Container, Form, Button, Col} from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Swal from "sweetalert2";


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
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please fill all the fields',
              })
           }
       }
       else {
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Please Login First To Add Expense',
           })
       }
    }

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    const handleClearExpenses = () => {
       if (isSuccess) {
           Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
           }).then((result) => {
               if (result.value) {
                   setExpenses([])
                   Swal.fire(
                       'Deleted!',
                       'Your file has been deleted.',
                       'success'
                   )
               }
           })
       }
       else {
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Please Login First To Clear Expenses',
           })
       }
    }

    const handleDeleteExpense = id => {
        if(isSuccess) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    const newExpenses = expenses.filter(expense => expense.id !== id)
                    setExpenses(newExpenses)
                    Swal.fire(
                        'Deleted!',
                        'Your expense has been deleted.',
                        'success'
                    )
                }
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First To Delete Expense',
            })
        }
    }

    //style const
    const style = {
       fontSize: '1.5rem',
       fontWeight: '500',
        marginTop: '1rem',
        marginBottom: '2rem'
    }
    return (
        <Container className="text-center mt-5 border-warning ">
            <div className="bg-light py-5">
                <h1>Expense Tracker</h1>
                <div>
                    <p style={style}>
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
