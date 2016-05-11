class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Initialize state.
      id: props.initialTask ? props.initialTask.id : '',
      date: props.initialTask ? props.initialTask.date : new Date().toISOString().substring(0, 10),
      entry: props.initialTask ? props.initialTask.entry : '',
      workedHours: props.initialTask ? props.initialTask.workedHours : '',
      priceCategoryId: props.initialTask ? props.initialTask.priceCategoryId : '',
      priceCategories: [],
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchPriceCategories = this.fetchPriceCategories.bind(this);
  }

  componentDidMount() {
    this.fetchPriceCategories();
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_task_path(
          this.props.lawsuitId,
          this.state.id
        ),
        { task: this.state },
        'tasksTouched'
      );
    } else { // Otherwise post.
      makePostRequest(
        Routes.lawsuit_tasks_path(
          this.props.lawsuitId
        ),
        { task: this.state },
        'tasksTouched'
      );
    }
  }

  handleInputChange(e) {
    // const nextState = {};
    // nextState[e.target.name] = e.target.value;
    // console.log(nextState);
    // this.setState(nextState);

    if (e.target.name === 'date') {
      this.setState({date: e.target.value})
    }
    if (e.target.name === 'entry') {
      if (this.state.entry.length < 10) {
        this.setState({entry: e.target.value})
      } else {
        $('#entry').addClass('has-danger');
        $('#entryHelpBlock').text("Får inte vara länge än 10 tecken.")
      }
    }
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  fetchPriceCategories() {
    const url = Routes.lawsuit_price_categories_path(this.props.lawsuitId);
    makeGetRequest(url)
      .success(response => {
        this.setState({ priceCategories: response.price_categories });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      })
  }

  render() {
    let priceCategoriesOptions = this.state.priceCategories.map(priceCategory =>
      <option key={priceCategory.id} value={priceCategory.id}>
        {priceCategory.name}</option>
    );
    return (
      <form className="form-inline task-form" onSubmit={this.handleOnSubmit}>
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
          <label htmlFor="workedHours">Arbetad tid</label>
          <input
            type="number"
            name="workedHours"
            className="form-control form-control-sm"
            value={this.state.workedHours}
            onChange={this.handleInputChange}
            min="0"
            step="0.05"
            required
          />
          <span id="entryHelpBlock" className="help-block"></span>
        </div>
        <div className="form-group">
          <label htmlFor="priceCategoryId">Priskategori</label>
          <select
            className="form-control"
            onChange={this.handleInputChange}
            name="priceCategoryId"
            value={this.state.priceCategoryId}
            required
          >
            {priceCategoriesOptions}
          </select>
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

TaskForm.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  initialTask: React.PropTypes.shape({
    id: React.PropTypes.number,
    date: React.PropTypes.string,
    entry: React.PropTypes.string,
    workedHours: React.PropTypes.number,
    priceCategoryId: React.PropTypes.number,
  }),
};
