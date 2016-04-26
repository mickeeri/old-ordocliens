class EditTaskForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      date: new Date().toISOString().substring(0, 10),
      entry: '',
      worked_hours: 0,
      price_category_id: 0,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state && this.state.id) { // If it has id it is update.
      // makePutRequest(Routes.client_legal_case_path(this.props.client_id, this.state.id),
      //   { task: this.state }, 'taskUpdated');
    } else { // Otherwise post.
      makePostRequest(
        Routes.client_legal_case_tasks_path(this.props.clientId, this.props.legalCaseId),
        { task: this.state },
        'taskAdded');
    }
  }

  handleInputChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    var priceCategoriesOptions = this.props.priceCategories.map(priceCategory=>
      <option key={priceCategory.id} value={priceCategory.id}>
        {priceCategory.name}</option>
    );
    return (
      <form className="form-inline" onSubmit={this.handleOnSubmit}>
        <FormGroup
          name="date"
          type="date"
          value={this.state ? this.state.date : ''}
          changeEvent={this.handleInputChange}
          label="Datum"
          required={true} />
          <div className="form-group form-group-textarea">
            <label htmlFor="entry">Notering</label>
            <textarea className="form-control" type="text-area"
              value={this.state ? this.state.entry : ''} name="entry"
              onChange={this.handleInputChange}>
            </textarea>
          </div>
          <FormGroup
            name="worked_hours"
            type="number"
            value={this.state ? this.state.worked_hours : ''}
            changeEvent={this.handleInputChange}
            label="Arbetade timmar"
            min="0"
            step="0.01"
            required={true} />
          <div className="form-group">
            <select className="form-control" onChange={this.handleInputChange}
              name="price_category_id">
              {priceCategoriesOptions}
            </select>
          </div>
        <hr/>
        <div className="action">
          <button className="button button-success" type="submit">Spara</button>
          <button className="button button-default" data-dismiss="modal">Avbryt</button>
        </div>
      </form>
    );
  }
}

EditTaskForm.propTypes = {
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
  priceCategories: React.PropTypes.array.isRequired,
};
