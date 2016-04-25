class LegalCaseEditForm extends React.Component {
  displayName: 'LegalCaseEditForm';

  constructor(props)  {
    super(props);
    this.state = props.legal_case;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state && this.state.id) { // If it has id it is update.
      makePutRequest(Routes.client_legal_case_path(this.props.client_id, this.state.id),
        { legal_case: this.state }, 'legalCaseUpdated');
    } else { // Otherwise post.
      makePostRequest(Routes.client_legal_cases_path(this.props.client_id),
        { legal_case: this.state });
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    if (this.state && this.state.id) {
      PubSub.publish('editModeButtonClicked');
    } else {
      window.location = Routes.client_path(this.props.client_id);
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.header} ärende</h3>
        </div>
        <div className="panel-body">
          <form className="form-inline" onSubmit={this.handleOnSubmit}>
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
            <div className="action">
              <button className="button button-success" type="submit">Spara</button>
              <button className="button button-default"
                onClick={this.handleCancelButtonClick}>Avbryt</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LegalCaseEditForm.propTypes = {
  legal_case: React.PropTypes.object,
  client_id: React.PropTypes.number.isRequired,
};
