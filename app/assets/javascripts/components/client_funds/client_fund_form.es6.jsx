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
    nextState[e.target.name] = e.target.value;
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

  render() {
    return (
      <div>
        <div className="alert modal-alert" id="client-fund-form-alert-modal">
          <i className="fa" id="client-fund-form-alert-modal-icon" aria-hidden="true"></i>
          <span id="client-fund-form-alert-modal-span"></span>
        </div>
        {this.state.showForm ?
          <form
            className="form-inline client-fund-form"
            onSubmit={this.handleOnSubmit}
            onKeyPress={this.handleKeyPress}
          >
            <p className="hidden message" id="client-fund-form-message"></p>
            <div className="form-group">
              <label htmlFor="date">Datum</label>
              <input
                type="date"
                name="date"
                className="form-control form-control-sm"
                value={this.state.date}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div id="entry" className="form-group form-group-textarea">
              <label htmlFor="entry">Notering</label>
              <textarea
                className="form-control"
                type="text-area"
                value={this.state.entry}
                name="entry"
                rows="5"
                onChange={this.handleInputChange}
                required
              >
              </textarea>
              <small id="entryHelpBlock" className="text-muted"></small>
            </div>
            <div className="form-group">
              <label htmlFor="balance">Saldo</label>
              <input
                placeholder="Saldo"
                type="number"
                name="balance"
                className="form-control form-control-sm"
                value={this.state.balance}
                onChange={this.handleInputChange}
                min="0"
                step="0.05"
                required
              />
              <span id="entryHelpBlock" className="help-block"></span>
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
