class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Initialize state.
      id: props.initialTask ? props.initialTask.id : '',
      date: props.initialTask ? props.initialTask.date : new Date().toISOString().substring(0, 10),
      entry: props.initialTask ? props.initialTask.entry : '',
      workedHours: props.initialTask ? props.initialTask.workedHours : '',
      priceCategoryId: props.initialTask ? props.initialTask.priceCategoryId : 3,
      priceCategories: [],
      showForm: true,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchPriceCategories = this.fetchPriceCategories.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.fetchPriceCategories();
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_task_path(this.props.lawsuitId, this.state.id),
        { task: this.state })
        .done(() => {
          this.setState({ showForm: false });
          // Calling method to show alert in utils.es6.jsx.
          showAlertInModal(
            'Arbete uppdaterat!',
            '#task-form-alert',
            'alert-success',
            'fa-check');
          // Then waiting before hiding message and updating tasks.
          setTimeout(() => {
            PubSub.publish('tasksTouched');
          }, 1000);
        })
        .fail(xhr => {
          showAlertInModal(
            `Ett fel uppstod. Status: ${xhr.status} ${xhr.statusText}`,
            '#task-form-alert',
            'alert-danger',
            'fa-exclamation-circle');
        });
    } else { // Otherwise post.
      const url = Routes.lawsuit_tasks_path(this.props.lawsuitId);
      const payload = { task: this.state };
      $.post(url, payload, () => {
        this.setState({ showForm: false });
        showAlertInModal(
          'Arbete sparat!',
          '#task-form-alert',
          'alert-success',
          'fa-check');
        setTimeout(() => {
          PubSub.publish('tasksTouched');
        }, 1000);
      })
      .fail(xhr => {
        showAlertInModal(
          `Ett fel uppstod. Status: ${xhr.status} ${xhr.statusText}`,
          '#task-form-alert',
          'alert-danger',
          'fa-exclamation-circle');
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleOnSubmit(e);
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

  fetchPriceCategories() {
    const url = Routes.lawsuit_price_categories_path(this.props.lawsuitId);
    makeGetRequest(url)
      .success(response => {
        this.setState({ priceCategories: response.price_categories });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    let priceCategoriesOptions = this.state.priceCategories.map(priceCategory =>
      <option key={priceCategory.id} value={priceCategory.id}>
        {priceCategory.name}</option>
    );
    return (
      <div>
        <div className="alert modal-alert" id="task-form-alert">
          <i className="fa" id="task-form-alert-icon" aria-hidden="true"></i>
          <span id="task-form-alert-span"></span>
        </div>
      {this.state.showForm ?
        <form
          className="form-inline task-form"
          onSubmit={this.handleOnSubmit}
          onKeyPress={this.handleKeyPress}
        >
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
              rows="4"
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
        : ''}
      </div>
    );
  }
}

TaskForm.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
  initialTask: React.PropTypes.shape({
    id: React.PropTypes.number,
    date: React.PropTypes.string,
    entry: React.PropTypes.string,
    workedHours: React.PropTypes.string,
    priceCategoryId: React.PropTypes.number,
  }),
};
