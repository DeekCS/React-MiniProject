import React from 'react'

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap'

const ExpenseForm = ({ name, amount, handleName, handleAmount, handleSubmitForm ,handleClearExpenses,handleDate})  => (
    <BTForm style={{ margin: 10 }} onSubmit={handleSubmitForm}>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          Name of Expense
        </Label>
        <Col sm={4}>
          <Input
              type="text"
              name="name"
              id="expenseName"
              placeholder="Name of expense?"
              onChange={handleName}
              value={name}
          />
        </Col>
      </FormGroup>
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          $ Amount
        </Label>
        <Col sm={4}>
          <Input
              type="number"
              name="amount"
              id="expenseAmount"
              placeholder="0.00"
              onChange={handleAmount}
              value={amount}
          />
        </Col>
      </FormGroup >
      <FormGroup className="row">
        <Label for="exampleEmail" sm={2}>
          Date
        </Label>
        <Col sm={4}>
          <Input type="date" name="date" id="expenseDate" onChange={handleDate}/>
        </Col>
      </FormGroup>
      <Button type="submit" color="primary">
        Add
      </Button>
      <Button color="danger" onClick={handleClearExpenses}>
        Delete
      </Button>
    </BTForm>
)

export default ExpenseForm;