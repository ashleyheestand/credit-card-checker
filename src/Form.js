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
    this.validate = this.validate.bind(this);
    this.doubleCheck = this.doubleCheck.bind(this);
  }

  //Need to change the type when a new number is input
  async handleInputChange(event) {
    // console.log('event', event.target.value.charAt(0));
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
      this.validate();
    }
    await this.setState({ [name]: value });
    this.doubleCheck();
    // console.log(this.state);
  }

  validate() {
    if (
      this.state.type === 'Visa' &&
      this.state.number.length >= 13 &&
      this.state.number.length <= 16
    ) {
      this.setState({ validated: true });
    } else if (
      this.state.type === 'Mastercard' &&
      this.state.number.length === 15
    ) {
      this.setState({ validated: true });
    } else if (
      this.state.type === 'American Express' &&
      this.state.number.length === 14
    ) {
      this.setState({ validated: true });
    } else {
      this.setState({ validated: false });
    }
  }
  doubleCheck() {
    if (this.state.validated) {
      const cardToCheck = this.state.number;
      let newNumber = '';
      if (cardToCheck.length % 2 === 0) {
        for (let i = 0; i < cardToCheck.length; i++) {
          let elem = cardToCheck[i];
          if (i % 2 === 0) {
            let digit = Number(elem);
            let doubled = digit * 2;
            console.log('doubled', doubled);
            if (doubled >= 10) {
              let string = doubled.toString();
              console.log('string', string);
              let result = Number(string[0]) + Number(string[1]);
              console.log('result', result);
              newNumber += result.toString();
            } else {
              newNumber += doubled.toString();
            }
          } else {
            newNumber += elem;
            console.log(newNumber, 'new number');
          }
        }
        let finalNewNumber = 0;
        for (let i = 0; i < newNumber.length; i++) {
          finalNewNumber += Number(newNumber[i]);
          console.log(finalNewNumber, 'final');
        }

        if (finalNewNumber % 10 !== 0) {
          this.setState({ validated: false });
        }
      } else {
        for (let i = 0; i < cardToCheck.length; i++) {
          let elem = cardToCheck[i];
          if (i % 2 === 1) {
            let digit = Number(elem);
            let doubled = digit * 2;
            console.log('doubled', doubled);
            if (doubled >= 10) {
              let string = doubled.toString();
              console.log('string', string);
              let result = Number(string[0]) + Number(string[1]);
              console.log('result', result);
              newNumber += result.toString();
            } else {
              newNumber += doubled.toString();
            }
          } else {
            newNumber += elem;
            console.log(newNumber, 'new number');
          }
        }
        let finalNewNumber = 0;
        for (let i = 0; i < newNumber.length; i++) {
          finalNewNumber += Number(newNumber[i]);
          console.log(finalNewNumber, 'final');
        }

        if (finalNewNumber % 10 !== 0) {
          this.setState({ validated: false });
        }
      }

      console.log('number', cardToCheck);
    }
  }

  render() {
    // console.log('state', this.state);
    // console.log('char', this.state.number.charAt(0));
    return (
      <div>
        <h1>Order Now</h1>

        <form>
          <hr />
          <div className="form-group">
            <label className="font-weight-bold">Credit card number: </label>

            <div className="input-group mb-3">
              <div>
                <input
                  className="form-control"
                  name="number"
                  type="number"
                  value={this.state.number}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="input-group-append">
                <div id="basic-addon3">
                  {this.state.validated === true ? (
                    <input
                      disabled
                      className="form-control is-valid"
                      value={this.state.type}
                    />
                  ) : (
                    <input
                      disabled
                      className="form-control is-invalid"
                      value={this.state.type}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="font-weight-bold">Name on card: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="font-weight-bold">Expiry Date: </label>
            <input
              name="date"
              type="text"
              placeholder="MM/DD//YYYY"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="font-weight-bold">CVV:</label>
            <input
              name="cvv"
              type="number"
              value={this.state.cvv}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
