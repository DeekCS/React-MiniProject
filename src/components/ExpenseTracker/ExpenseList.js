import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const ExpenseList = ({ expenses,handleDeleteExpense }) => {
  const expensesTable = expenses.map((expense) =>
      <tr key={expense.id}>
        <td className="cell-expense-date">{expense.date}</td>
        <td className="cell-expense-location">{expense.name}</td>
        <td className="cell-expense-cost">{expense.amount}</td>
        <td className="cell-delete-button">
          <Button onClick={() => handleDeleteExpense(expense.id)} size="sm" variant="danger" >X</Button>
        </td>
      </tr>
  )

  return (
      <Container>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th className="cell-expense-date">Date</th>
            <th className="cell-expense-location">Name</th>
            <th className="cell-expense-cost">Cost</th>
            <th className="cell-delete-button">Delete</th>
          </tr>
          </thead>
          <tbody>
          {expensesTable}
          </tbody>
        </Table>
      </Container>
  )
}

export default ExpenseList;