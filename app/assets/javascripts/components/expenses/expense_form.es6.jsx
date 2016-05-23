class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.initialExpense ? props.initialExpense.entry : '',
      id: props.initialExpense ? props.initialExpense.id : '',
      price: props.initialExpense ? props.initialExpense.price : '',
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
        <div className="alert modal-alert" id="expense-form-alert-modal">
          <i className="fa" id="expense-form-alert-modal-icon" aria-hidden="true"></i>
          <span id="expense-form-alert-modal-span"></span>
        </div>
        {this.state.showForm ?
          <form
            className="form-inline expense-form"
            onSubmit={this.handleOnSubmit}
            onKeyPress={this.handleKeyPress}
          >
            <p className="hidden message" id="expense-form-message"></p>
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
              <label htmlFor="price">Kostnad</label>
              <input
                placeholder="Kostnad"
                type="number"
                name="price"
                className="form-control form-control-sm"
                value={this.state.price}
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

ExpenseForm.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  initialExpense: React.PropTypes.shape({
    id: React.PropTypes.number,
    entry: React.PropTypes.string,
    price: React.PropTypes.number,
  }),
};
