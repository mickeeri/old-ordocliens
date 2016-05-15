class LawsuitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.initialLawsuit ? props.initialLawsuit.id : '',
      name: props.initialLawsuit ? props.initialLawsuit.name : '',
      court: props.initialLawsuit ? props.initialLawsuit.court : '',
      caseNumber: props.initialLawsuit ? props.initialLawsuit.caseNumber : '',
      closed: props.initialLawsuit ? props.initialLawsuit.closed : false,
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.lawsuit_path(this.state.id, this.props.clientId),
        { lawsuit: this.state }, 'lawsuitUpdated');
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
    e.preventDefault();
    this.setState({ closed: !this.state.closed });
    makePutRequest(Routes.lawsuit_path(this.state.id, this.props.clientId),
      { lawsuit: { closed: this.state.closed } }, 'lawsuitUpdated');
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    const isEdit = this.state.id !== '';
    return (
      <form className="form form-inline" onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="name">Uppdrag</label>
          <input
            className="form-control form-control-sm"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
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
