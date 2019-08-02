import React from 'react';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      number: '',
      name: '',
      date: '',
      cvv: '',
      type: '',
      validated: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkType = this.checkType.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    if (this.state.number) {
      this.checkType();
    }
  }

  checkType() {
    if (this.state.number.slice(0) === 4) {
      this.setState({ type: 'Visa' });
    }
    if (this.state.number.charAt(0) === 5) {
      this.setState({ type: 'Mastercard' });
    }
    if (
      this.state.number.charAt(0) === 3 &&
      (this.state.number.charAt(1) === 4 || this.state.number.charAt(1) === 7)
    ) {
      this.setState({ type: 'American Express' });
    } else {
      this.setState({ type: '?' });
    }
  }

  render() {
    console.log('state', this.state);
    console.log('char', this.state.number.slice(0));
    return (
      <div>
        <h1>Order Now</h1>
        <form>
          <label>
            Credit card number:
            <input
              name="number"
              type="number"
              value={this.state.number}
              onChange={this.handleInputChange}
            />
          </label>
          <div>Type: {this.state.type}</div>
          <label>
            Name on card:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              name="date"
              type="text"
              placeholder="MM/DD//YYYY"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            CVV:
            <input
              name="cvv"
              type="number"
              value={this.state.cvv}
              onChange={this.handleInputChange}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
