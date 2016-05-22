class CounterpartsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counterparts: [],
      selectedCounterpart: '',
      showForm: true,
    };
    this.fetchCounterparts = this.fetchCounterparts.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchCounterparts();
  }

  handleSelectChange(e) {
    this.setState({ selectedCounterpart: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    makePutRequest(Routes.counterpart_path(this.state.selectedCounterpart),
      { counterpart: { lawsuit_id: this.props.lawsuitId } })
      .done(() => {
        this.setState({ showForm: false });
        showAlertInModal(
          'Motpart tillagd!',
          '#counterpart-dropdown-alert',
          'alert-success',
          'fa-check');
        setTimeout(() => {
          PubSub.publish('counterpartListUpdated');
        }, 1000);
      })
      .fail(xhr => {

      });
  }

  dismissBtnClicked(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  fetchCounterparts() { // Get counterparts to be displayed in dropdown.
    const url = Routes.counterparts_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ counterparts: response.counterparts });
      })
      .error(xhr => {
        const alert = $('#lawsuit-counterparts-dropdown-message');
        alert.text('Kunde inte hämta befintliga motparter. Försök igen senare.');
        alert.addClass('text-danger');
        alert.slideDown(300);
      });
  }

  render() {
    return (
      <div>
        <div className="alert modal-alert" id="counterpart-dropdown-alert">
          <i className="fa" id="counterpart-dropdown-alert-icon" aria-hidden="true"></i>
          <span id="counterpart-dropdown-alert-span"></span>
        </div>
        {this.state.showForm ?
          <form onSubmit={this.handleOnSubmit}>
            <p className="hidden message" id="lawsuit-counterparts-dropdown-message">
            </p>
            <label htmlFor="counterparts"></label>
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.handleSelectChange}
                name="counterparts"
                value={this.state.selectedCounterpart}
                required
              >
                <option value="" disabled>Välj en motpart</option>
                {this.state.counterparts.map(counterpart =>
                  <option
                    key={counterpart.id}
                    value={counterpart.id}
                  >{counterpart.name} ({counterpart.personalNumber})</option>
                )}
              </select>
            </div>
            <div className="content-right">
              <button className="btn btn-secondary" onClick={this.dismissBtnClicked}>
                Avbryt
              </button>
              <button className="btn btn-success" type="submit">Spara</button>
            </div>
          </form>
        : ''}
      </div>
    );
  }
}

CounterpartsDropdown.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
