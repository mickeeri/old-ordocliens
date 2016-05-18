class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Initialize state.
      id: props.initialExpense ? props.initialExpense.id : '',
      entry: props.initialExpense ? props.initialExpense.entry : '',
      price: props.initialExpense ? props.initialExpense.price : '',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_expense_path(
          this.props.lawsuitId,
          this.state.id
        ),
        { expense: this.state },
        'expensesTouched'
      );
    } else { // Otherwise post.
      makePostRequest(
        Routes.lawsuit_expenses_path(
          this.props.lawsuitId
        ),
        { expense: this.state },
        'expensesTouched'
      );
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    return (
      <form className="form-inline expense-form" onSubmit={this.handleOnSubmit}>
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
