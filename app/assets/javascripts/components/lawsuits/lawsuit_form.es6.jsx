class LawsuitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.initialLawsuit ? props.initialLawsuit.id : '',
      lawsuitTypeId: props.initialLawsuit ? props.initialLawsuit.lawsuitType.id : '',
      court: props.initialLawsuit ? props.initialLawsuit.court : '',
      caseNumber: props.initialLawsuit ? props.initialLawsuit.caseNumber : '',
      closed: props.initialLawsuit ? props.initialLawsuit.closed : false,
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.fetchLawsuitTypes = this.fetchLawsuitTypes.bind(this);
    this.setLawsuitType = this.setLawsuitType.bind(this);
  }

  componentDidMount() {
    this.fetchLawsuitTypes();
  }

  setLawsuitType(e) {
    this.setState({ lawsuitTypeId: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const alert = $('#lawsuit-form-message');
    if (this.state.id) { // If it has id it is update.
      makePutRequest(
        Routes.lawsuit_path(this.state.id, this.props.clientId),
        { lawsuit: this.state })
        .done(() => {
          alert.text('Ärende uppdaterat');
          alert.removeClass('text-danger');
          alert.addClass('text-success');
          alert.slideDown();
          alert.delay(1000).slideUp(300);
        })
        .fail(xhr => {
          alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
    } else { // Otherwise post.
      makePostRequest(
        `${Routes.lawsuits_path()}?client_id=${this.props.clientId}`,
        { lawsuit: this.state },
        'lawsuitsTouched');
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCheckBoxChange(e) {
    this.setState({ closed: !this.state.closed });
    this.handleOnSubmit(e);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  fetchLawsuitTypes() {
    const url = Routes.lawsuit_types_path();
    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuitTypes: response.lawsuitTypes });
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    const isEdit = this.state.id !== '';
    return (
      <form className="form form-inline" onSubmit={this.handleOnSubmit}>
        <p className="hidden message" id="lawsuit-form-message">
          {this.state.message}
        </p>
        {isEdit ?
          <div>
            <strong>Skapat: </strong>{new Date(this.props.initialLawsuit.createdAt).yyyymmdd()}
          </div> :
          ''}
        <div className="form-group">
          <LawsuitTypesDropdown
            selectedId={this.state.lawsuitTypeId}
            changeEvent={this.setLawsuitType}
          />
        </div>
        <div className="form-group">
          <label htmlFor="court">Domstol</label>
          <input
            className="form-control form-control-sm"
            name="court"
            type="text"
            value={this.state.court}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="caseNumber">Målnummer</label>
          <input
            name="caseNumber"
            className="form-control form-control-sm"
            value={this.state.caseNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <hr />
        <div className="content-right">
          {isEdit ? '' :
            <button
              className="btn btn-secondary"
              onClick={this.handleCancelButtonClick}
            >Avbryt
            </button>}
          <button className="btn btn-primary" type="submit">
            {isEdit ? 'Uppdatera' : 'Spara ärende'}
          </button>
        </div>
      </form>
    );
  }
}

LawsuitForm.propTypes = {
  initialLawsuit: React.PropTypes.object,
  clientId: React.PropTypes.number,
};
