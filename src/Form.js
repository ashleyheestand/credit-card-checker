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
    // this.checkType = this.checkType.bind(this);
    this.validate = this.validate.bind(this);
  }

  //Need to change the type when a new number is input
  handleInputChange(event) {
    console.log('event', event.target.value.charAt(0));
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'number') {
      const firstNumber = event.target.value.charAt(0);
      const secondNumber = event.target.value.charAt(1);
      console.log(firstNumber, 'first', secondNumber);
      if (firstNumber === '4') {
        this.setState({ type: 'Visa' });
      } else if (firstNumber === '5') {
        this.setState({ type: 'Mastercard' });
      } else if (
        firstNumber === '3' &&
        (secondNumber === '3' || secondNumber === '7')
      ) {
        this.setState({ type: 'American Express' });
      } else {
        this.setState({ type: '?' });
      }
    }
    this.setState({ [name]: value });
    if (this.state.number) {
      // this.checkType();
      this.validate();
    }
  }

  //also need a handle submit function
  //should move checking for type out of the handle change function

  // checkType() {
  //   console.log('character', this.state.number.charAt(0));
  //   if (this.state.number.charAt(0) === '4') {
  //     this.setState({ type: 'Visa' });
  //   }
  //   if (this.state.number.charAt(0) === 5) {
  //     this.setState({ type: 'Mastercard' });
  //   }
  //   if (
  //     this.state.number.charAt(0) === 3 &&
  //     (this.state.number.charAt(1) === 4 || this.state.number.charAt(1) === 7)
  //   ) {
  //     this.setState({ type: 'American Express' });
  //   } else {
  //     this.setState({ type: '?' });
  //   }
  // }

  //not currently using this function -- there is definitely a better way to validate using react forms
  validate() {
    if (
      this.state.type === 'Visa' &&
      this.state.number.length >= 13 &&
      this.state.number.length <= 16
    ) {
      this.setState({ validated: true });
    }
    if (this.state.type === 'Mastercard' && this.state.number.length === 16) {
      this.setState({ validated: true });
    }
    if (
      this.state.type === 'American Express' &&
      this.state.number.length === 15
    ) {
      this.setState({ validated: true });
    } else {
      this.setState({ validated: false });
    }
  }

  render() {
    console.log('state', this.state);
    console.log('char', this.state.number.charAt(0));
    return (
      <div>
        <h1>Order Now</h1>
        <form>
          {/* need to fix where this appears and styling  */}
          <div>Type: {this.state.type}</div>
          <div>
            {this.state.validated === true ? (
              <i className="fas fa-check" />
            ) : (
              <i className="fas fa-times" />
            )}
          </div>
          <label>
            Credit card number:
            <input
              name="number"
              type="number"
              value={this.state.number}
              onChange={this.handleInputChange}
            />
          </label>

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
