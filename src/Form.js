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
      this.validate();
    }
    this.setState({ [name]: value });
  }

  //not currently using this function -- there is definitely a better way to validate using react forms
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

  render() {
    console.log('state', this.state);
    console.log('char', this.state.number.charAt(0));
    return (
      <div>
        <h1>Order Now</h1>

        <form>
          <hr />
          <div class="form-group">
            <label class="font-weight-bold">Credit card number: </label>

            <div class="input-group mb-3">
              <div>
                <input
                  class="form-control"
                  name="number"
                  type="number"
                  value={this.state.number}
                  onChange={this.handleInputChange}
                />
              </div>
              <div class="input-group-append">
                <div id="basic-addon3">
                  {this.state.validated === true ? (
                    <input
                      disabled
                      class="form-control is-valid"
                      value={this.state.type}
                    />
                  ) : (
                    <input
                      disabled
                      class="form-control is-invalid"
                      value={this.state.type}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Name on card: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Expiry Date: </label>
            <input
              name="date"
              type="text"
              placeholder="MM/DD//YYYY"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group">
            <label class="font-weight-bold">CVV:</label>
            <input
              name="cvv"
              type="number"
              value={this.state.cvv}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
