class LegalCaseEditForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = props.legal_case; // TODO: rename to initialLegalCase
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state && this.state.id) { // If it has id it is update.
      makePutRequest(Routes.client_legal_case_path(this.props.clientId, this.state.id),
        { legal_case: this.state }, 'legalCasesTouched');
    } else { // Otherwise post.
      makePostRequest(Routes.client_legal_cases_path(this.props.clientId),
        { legal_case: this.state }, 'legalCasesTouched');
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleOnSubmit}>
        <FormGroup
          name="name"
          type="text"
          value={this.state ? this.state.name : ''}
          changeEvent={this.handleNameChange}
          autoFocus="true"
          label="Ärendenamn"
          required={true}
        />
        <hr/>
        <div className="content-right">
          <button className="btn btn-secondary"
            onClick={this.handleCancelButtonClick}>Avbryt
          </button>
          <button className="btn btn-success-outline" type="submit">
            Spara
          </button>
        </div>
      </form>
    );
  }
}

LegalCaseEditForm.propTypes = {
  legal_case: React.PropTypes.object,
  clientId: React.PropTypes.number.isRequired,
};
