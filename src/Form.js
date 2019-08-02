import React from 'react'

export default class Form extends React.Componenet {
  constructor() {
    super();

    this.state = {
      number: 0,
      name: '',
      date: '',
      cvv: 0
    }
this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }
  render() {
    return (
      <form></form>
    )
  }
}