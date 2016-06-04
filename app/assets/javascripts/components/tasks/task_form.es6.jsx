class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Initialize state.
      id: props.initialTask ? props.initialTask.id : '',
      date: props.initialTask ? props.initialTask.date : new Date().toISOString().substring(0, 10),
      entry: props.initialTask ? props.initialTask.entry : '',
      workedHours: props.initialTask ? props.initialTask.workedHours : '',
      priceCategoryId: props.initialTask ? props.initialTask.priceCategory.id : 3,
      priceCategories: [],
      showForm: true,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchPriceCategories = this.fetchPriceCategories.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.validate = this.validate.bind(this);
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
          const message = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(message, '#task-form-message');
        });
    } else { // Otherwise post.
      // Validate all input fields before submitting.
      $('#task-form *').filter(':input').each((key, input) => {
        this.validate(input);
      });
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
        const message = xhr.status === 422 ?
          'Formuläret innehåller fel. Rätta till dem och försök igen.' :
          `Fel uppstod. Statuskod: ${xhr.status}`;
        showErrorText(message, '#task-form-message');
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleOnSubmit(e);
    }
  }

  handleInputChange(e) {
    console.log(e.target.id);
    console.log(e.target.value);
    const nextState = {};
    nextState[e.target.id] = e.target.value;
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

  validate(e) {
    const input = e.target ? e.target : e;

    if (input.id === 'date') {
      return validateDate(input.value, input.id);
    }
    if (input.id === 'entry') {
      return validateStringLength(input.value, 500, 1, input.name, 'Notering');
    }
    if (input.id === 'workedHours') {
      return validateNumber(input.value, input.id, 'Arbetade timmar', 0, 24, 0.05, true);
    }
    if (input.id === 'priceCategoryId') {
      return validateRequiredSelect(input.value, input.id, 'priskategori');
    }

    return false;
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
          id="task-form"
          noValidate
          onKeyPress={this.handleKeyPress}
          onSubmit={this.handleOnSubmit}
        >
          <p className="hidden message" id="task-form-message"></p>
          <div id="dateGroup" className="form-group row">
            <label className="col-sm-7" htmlFor="date">Datum</label>
            <div className="col-sm-5">
              <input
                type="date"
                name="date"
                id="date"
                className="form-control form-control-sm"
                value={this.state.date}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
              <small id="dateHelper" className="text-muted"></small>
            </div>
          </div>
          <div id="entryGroup" className="form-group row">
            <label className="col-sm-3 text-area-label" htmlFor="entry">Notering</label>
            <div className="col-sm-9">
              <small className="text-muted helper">
                Tryck Shift + Enter för att byta rad
              </small>
              <textarea
                placeholder="Notering"
                className="form-control"
                type="text-area"
                value={this.state.entry}
                name="entry"
                id="entry"
                rows="4"
                onChange={this.handleInputChange}
                onBlur={this.validate}
              ></textarea>
            </div>
            <small id="entryHelper" className="text-muted text-danger helper"></small>
          </div>
          <div id="workedHoursGroup" className="form-group row">
            <label className="col-sm-9" htmlFor="workedHours">Arbetad tid</label>
            <div className="col-sm-3">
              <input
                placeholder="Timmar"
                type="number"
                name="workedHours"
                id="workedHours"
                className="form-control form-control-sm"
                value={this.state.workedHours}
                onChange={this.handleInputChange}
                onBlur={this.validate}
                min="0"
                step="0.05"
              />
            </div>
            <small id="workedHoursHelper" className="text-muted text-danger helper"></small>
          </div>
          <div id="priceCategoryGroup" className="form-group row">
            <label className="col-sm-6" htmlFor="priceCategory">Priskategori</label>
            <div className="col-sm-6">
              <select
                className="form-control"
                onChange={this.handleInputChange}
                onBlur={this.validate}
                id="priceCategoryId"
                value={this.state.priceCategoryId}
              >{priceCategoriesOptions}</select>
            </div>
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
    priceCategory: React.PropTypes.number,
  }),
};
