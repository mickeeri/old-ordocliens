class CounterpartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      personalNumber: props.personalNumber,
      representative: props.representative,
      info: props.info,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.counterpart_path(this.state.id),
        { counterpart: this.state }, 'counterpartUpdated');
    } else { // Otherwise post.
      const action = this.props.lawsuitId ? 'counterpartListUpdated' : 'redirect';
      makePostRequest(Routes.counterparts_path(),
        { counterpart: this.state }, action);
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    PubSub.publish('dismissEdit');
  }

  render() {
    const isEdit = this.state !== '' && this.state.id !== '';
    return (
      <form className="form form-inline" onSubmit={this.handleOnSubmit}>
        <FormGroup
          name="name"
          type="text"
          value={this.state.name}
          changeEvent={this.handleInputChange}
          autoFocus="true"
          label="Namn"
          required
        />
        <FormGroup
          name="personalNumber"
          type="tel"
          value={this.state.personalNumber}
          changeEvent={this.handleInputChange}
          label="Personnummer"
          required
          maxLength={11}
          minLength={11}
        />
        <FormGroup
          name="representative"
          type="text"
          value={this.state.representative}
          changeEvent={this.handleInputChange}
          label="Motpartsombud"
        />
        <div className="form-group form-group-textarea">
          <label htmlFor="info">Kontaktinfo</label>
          <textarea
            className="form-control"
            type="text-area"
            value={this.state ? this.state.info : ''}
            name="info"
            rows="4"
            onChange={this.handleInputChange}
          >
          </textarea>
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
            {isEdit ? 'Uppdatera' : 'Spara motpart'}
          </button>
        </div>
      </form>
    );
  }
}

CounterpartForm.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  info: React.PropTypes.string.isRequired,
  personalNumber: React.PropTypes.string.isRequired,
  representative: React.PropTypes.string.isRequired,
  lawsuitId: React.PropTypes.number,
};
