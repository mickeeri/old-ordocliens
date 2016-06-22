class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.initialExpense ? props.initialExpense.entry : '',
      id: props.initialExpense ? props.initialExpense.id : '',
      price: props.initialExpense ? parseFloat(props.initialExpense.price).toFixed(2) : '',
      showForm: true };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_expense_path(this.props.lawsuitId, this.state.id),
        { expense: this.state })
        .done(() => {
          this.setState({ showForm: false });
          showAlertInModal(
            'Utläggsrad uppdaterad!',
            '#expense-form-alert-modal',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('expensesTouched');
          }, 1000);
        })
        .fail(xhr => {
          errorMessage = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(errorMessage, '#expense-form-message');
        });
    } else { // Otherwise post.
      // Validate all input fields before submitting.
      $('#expense-form *').filter(':input').each((key, input) => {
        this.validate(input);
      });
      makePostRequest(
        Routes.lawsuit_expenses_path(this.props.lawsuitId),
        { expense: this.state })
        .done(() => {
          this.setState({ showForm: false });
          showAlertInModal(
            'Utlägg sparad!',
            '#expense-form-alert-modal',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('expensesTouched');
          }, 1000);
        })
        .fail(xhr => {
          errorMessage = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(errorMessage, '#expense-form-message');
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
    if (input.id === 'entry') {
      return validateStringLength(input.value, 1000, 1, input.id, 'Notering');
    }
    if (input.id === 'price') {
      return validateNumber(input.value, input.id, 'Kostnad', 0, 100000, '', true);
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className="alert modal-alert" id="expense-form-alert-modal">
          <i className="fa" id="expense-form-alert-modal-icon" aria-hidden="true"></i>
          <span id="expense-form-alert-modal-span"></span>
        </div>
        {this.state.showForm ?
          <form
            id="expense-form"
            noValidate
            onKeyPress={this.handleKeyPress}
            onSubmit={this.handleOnSubmit}
          >
            <p className="hidden message" id="expense-form-message"></p>
            <div id="entryGroup" className="form-group row">
              <label className="col-sm-3 text-area-label" htmlFor="entry">Notering</label>
              <div className="col-sm-9">
                <small className="text-muted helper">Tryck Shift + Enter för att byta rad</small>
                <textarea
                  className="form-control"
                  type="text-area"
                  value={this.state.entry}
                  name="entry"
                  id="entry"
                  rows="5"
                  onChange={this.handleInputChange}
                  onBlur={this.validate}
                  autoFocus
                >
                </textarea>
              </div>
              <small id="entryHelper" className="text-muted text-danger helper"></small>
            </div>
            <div id="priceGroup" className="form-group row">
              <label className="col-sm-8" htmlFor="price">Kostnad</label>
              <div className="col-sm-4">
                <input
                  placeholder="Kostnad"
                  type="text"
                  id="price"
                  className="form-control form-control-sm"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  onBlur={this.validate}
                />
              </div>
              <small id="priceHelper" className="text-muted text-danger helper"></small>
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

ExpenseForm.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  initialExpense: React.PropTypes.shape({
    id: React.PropTypes.number,
    entry: React.PropTypes.string,
    price: React.PropTypes.number,
  }),
};
