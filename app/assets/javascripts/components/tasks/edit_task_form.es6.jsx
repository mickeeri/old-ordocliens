class EditTaskForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = { // Initialize state.
      id: props.initialTask ? props.initialTask.id : '',
      date: props.initialTask ? props.initialTask.date : new Date().toISOString().substring(0, 10),
      entry: props.initialTask ? props.initialTask.entry : '',
      worked_hours: props.initialTask ? props.initialTask.worked_hours : '',
      price_category_id: props.initialTask ? props.initialTask.price_category_id : '',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.client_legal_case_task_path(
          this.props.clientId,
          this.props.legalCaseId,
          this.state.id
        ),
        { task: this.state },
        'tasksTouched'
      );
    } else { // Otherwise post.
      makePostRequest(
        Routes.client_legal_case_tasks_path(
          this.props.clientId,
          this.props.legalCaseId
        ),
        { task: this.state },
        'tasksTouched'
      );
    }
  }

  handleInputChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
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
          value={this.state.date}
          changeEvent={this.handleInputChange}
          label="Datum"
          required={true}
        />
        <div className="form-group form-group-textarea">
          <label htmlFor="entry">Notering</label>
          <textarea
            className="form-control"
            type="text-area"
            value={this.state.entry}
            name="entry"
            rows="3"
            onChange={this.handleInputChange}
            required>
          </textarea>
        </div>
        <FormGroup
          name="worked_hours"
          type="number"
          value={this.state.worked_hours}
          changeEvent={this.handleInputChange}
          label="Arbetade timmar"
          min="0"
          step="0.05"
          required={true}
        />
        <div className="form-group">
          <label htmlFor="price_category_id">Priskategori</label>
          <select className="form-control"
            onChange={this.handleInputChange}
            name="price_category_id"
            value={this.state.price_category_id}
            required>
            <option value="" disabled>Välj en priskategori</option>
            {priceCategoriesOptions}
          </select>
        </div>
        <hr/>
        <div className="action">
          <button className="button button-success" type="submit">Spara</button>
          <button className="button button-default" onClick={this.dismissBtnClicked}>Avbryt</button>
        </div>
      </form>
    );
  }
}

EditTaskForm.propTypes = {
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
  priceCategories: React.PropTypes.array.isRequired,
  initialTask: React.PropTypes.object,
};
