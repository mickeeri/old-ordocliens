class ClientFundForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.initialClientFund ? props.initialClientFund.entry : '',
      id: props.initialClientFund ? props.initialClientFund.id : '',
      date: props.initialClientFund ?
        props.initialClientFund.date :
        new Date().toISOString().substring(0, 10),
      balance: props.initialClientFund ?
        parseFloat(props.initialClientFund.balance).toFixed(2) :
        '',
      showForm: true };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_client_fund_path(this.props.lawsuitId, this.state.id),
        { clientFund: this.state })
        .done(() => {
          this.setState({ showForm: false });
          showAlertInModal(
            'Rad uppdaterad!',
            '#client-fund-form-alert-modal',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('clientFundsTouched');
          }, 1000);
        })
        .fail(xhr => {
          errorMessage = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(errorMessage, '#client-fund-form-message');
        });
    } else { // Otherwise post.
      // Validate all input fields before submitting. Only on POST.
      Array.from(e.target.getElementsByClassName('form-control'))
        .forEach((input) => {
          this.validate(input);
        });
      makePostRequest(
        Routes.lawsuit_client_funds_path(this.props.lawsuitId),
        { clientFund: this.state })
        .done(() => {
          this.setState({ showForm: false });
          showAlertInModal(
            'Klientmedel sparad!',
            '#client-fund-form-alert-modal',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('clientFundsTouched');
          }, 1000);
        })
        .fail(xhr => {
          errorMessage = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(errorMessage, '#client-fund-form-message');
        });
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.id] = e.target.value;
    this.setState(nextState);
  }

  // Submit when pressing Enter.
  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleOnSubmit(e);
    }
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  validate(e) {
    const input = e.target ? e.target : e;

    if (input.id === 'date') {
      return validateDate(input.value, input.id);
    }
    if (input.id === 'entry') {
      return validateStringLength(input.value, 500, 1, input.id, 'Notering');
    }
    if (input.id === 'balance') {
      return validateNumber(input.value, input.id, 'Kostnad', -100000, 100000, '', true);
    }

    return false;
  }

  render() {
    return (
      <div>
        <div className="alert modal-alert" id="client-fund-form-alert-modal">
          <i className="fa" id="client-fund-form-alert-modal-icon" aria-hidden="true"></i>
          <span id="client-fund-form-alert-modal-span"></span>
        </div>
        {this.state.showForm ?
          <form
            onSubmit={this.handleOnSubmit}
            onKeyPress={this.handleKeyPress}
            noValidate
          >
            <p className="hidden message" id="client-fund-form-message"></p>
            <div id="dateGroup" className="form-group row">
              <label className="col-sm-7" htmlFor="date">Datum</label>
              <div className="col-sm-5">
                <input
                  className="form-control form-control-sm"
                  id="date"
                  onBlur={this.validate}
                  onChange={this.handleInputChange}
                  type="date"
                  value={this.state.date}
                />
              </div>
              <small id="dateHelper" className="text-muted text-danger helper"></small>
            </div>
            <div id="entryGroup" className="form-group row">
              <label className="col-sm-3 text-area-label" htmlFor="entry">Notering</label>
              <div className="col-sm-9">
                <small className="text-muted helper">Tryck Shift + Enter för att byta rad</small>
                <textarea
                  className="form-control"
                  id="entry"
                  onBlur={this.validate}
                  onChange={this.handleInputChange}
                  rows="5"
                  type="text-area"
                  value={this.state.entry}
                ></textarea>
              </div>
              <small id="entryHelper" className="text-muted text-danger helper"></small>
            </div>
            <div id="balanceGroup" className="form-group row">
              <label className="col-sm-8" htmlFor="balance">Saldo</label>
              <div className="col-sm-4">
                <input
                  className="form-control form-control-sm"
                  id="balance"
                  min="0"
                  onBlur={this.validate}
                  onChange={this.handleInputChange}
                  placeholder="Saldo"
                  step="0.05"
                  type="number"
                  value={this.state.balance}
                />
              </div>
              <small id="balanceHelper" className="text-muted text-danger helper"></small>
            </div>
            <hr />
            <div className="content-right">
              <button className="btn btn-secondary" onClick={this.dismissBtnClicked}>Avbryt</button>
              <button className="btn btn-success" type="submit">Spara</button>
            </div>
          </form>
        : ''}
      </div>
    );
  }
}

ClientFundForm.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  initialClientFund: React.PropTypes.shape({
    id: React.PropTypes.number,
    date: React.PropTypes.date,
    entry: React.PropTypes.string,
    balance: React.PropTypes.number,
  }),
};
