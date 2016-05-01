class LegalCaseEditForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      id: props.initialLegalCase ? props.initialLegalCase.id : '',
      name: props.initialLegalCase ? props.initialLegalCase.name : '',
      active: props.initialLegalCase ? props.initialLegalCase.active : '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCheckBoxChange(e) {
    this.setState({ active: e.target.checked });
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    var isEdit = this.state.id ? true : false;
    return (
      <form className="form" onSubmit={this.handleOnSubmit}>
        <FormGroup
          name="name"
          type="text"
          value={this.state ? this.state.name : ''}
          changeEvent={this.handleNameChange}
          autoFocus="true"
          label="Ärendenamn"
          required={true} />
        <div className="checkbox">
          { isEdit ?
            <label className="c-input c-checkbox">
              <input
                type="checkbox"
                id="active"
                checked={this.state.active}
                onChange={this.handleCheckBoxChange}/>
              <span className="c-indicator"></span>
                Aktivt
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
