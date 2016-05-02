class LegalCaseEditForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      id: props.initialLegalCase ? props.initialLegalCase.id : '',
      name: props.initialLegalCase ? props.initialLegalCase.name : '',
      court: props.initialLegalCase ? props.initialLegalCase.court : '',
      case_number: props.initialLegalCase ? props.initialLegalCase.case_number : '',
      closed: props.initialLegalCase ? props.initialLegalCase.closed : '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.client_legal_case_path(this.props.clientId, this.state.id),
        { legal_case: this.state }, 'legalCaseTouched');
    } else { // Otherwise post.
      makePostRequest(Routes.client_legal_cases_path(this.props.clientId),
        { legal_case: this.state }, 'legalCasesTouched');
    }
  }

  handleInputChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCheckBoxChange(e) {
    this.setState({ closed: e.target.checked });
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    var isEdit = this.state.id ? true : false;
    return (
      <form className="form form-inline" onSubmit={this.handleOnSubmit}>
        <FormGroup
          name="name"
          type="text"
          value={this.state.name}
          changeEvent={this.handleInputChange}
          autoFocus="true"
          label="Uppdrag"
          required={true} />
        <FormGroup
          name="court"
          type="text"
          value={this.state.court}
          changeEvent={this.handleInputChange}
          label="Domstol"
          required={false} />
        <FormGroup
          name="case_number"
          type="text"
          value={this.state.case_number}
          changeEvent={this.handleInputChange}
          label="Målnummer"
          required={false} />
        <div className="checkbox">
          { isEdit ?
            <label className="c-input c-checkbox">
              <input
                type="checkbox"
                id="closed"
                checked={this.state.closed}
                onChange={this.handleCheckBoxChange}/>
              <span className="c-indicator"></span>
                Avslutat
            </label> : '' }
        </div>
        <hr/>
        <div className="content-right">
          { isEdit ? '' :
            <button className="btn btn-secondary"
              onClick={this.handleCancelButtonClick}>Avbryt
            </button> }
          <button className="btn btn-success" type="submit">
            { isEdit ? 'Uppdatera' : 'Spara mål' }
          </button>
        </div>
      </form>
    );
  }
}

LegalCaseEditForm.propTypes = {
  initialLegalCase: React.PropTypes.object,
  clientId: React.PropTypes.number.isRequired,
};
