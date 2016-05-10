class CounterpartsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counterparts: [],
      selectedCounterpart: '',
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
      { counterpart: { lawsuit_id: this.props.lawsuitId } }, 'counterpartListUpdated');
  }

  dismissBtnClicked() {
    PubSub.publish('dismissEdit');
  }

  fetchCounterparts() { // Get counterparts to be displayed in dropdown.
    const url = Routes.counterparts_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ counterparts: response.counterparts });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
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
            <button className="btn btn-secondary btn-sm" onClick={this.dismissBtnClicked}>
              Avbryt
            </button>
            <button className="btn btn-success btn-sm" type="submit">Spara</button>
          </div>
        </form>
      </div>
    );
  }
}

CounterpartsDropdown.propTypes = {
  lawsuitId: React.PropTypes.number.isRequired,
};
