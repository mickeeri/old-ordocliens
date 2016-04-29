class CounterPartForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      id: props.initialCounterpart ? props.initialCounterpart.id : '',
      name: props.initialCounterpart ? props.initialCounterpart.name : '',
      personal_number: props.initialCounterpart ? props.initialCounterpart.personal_number : '',
      representative: props.initialCounterpart ? props.initialCounterpart.representative : '',
      info: props.initialCounterpart ? props.initialCounterpart.info : '',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.client_counterpart_path(this.props.clientId, this.state.id),
        { counterpart: this.state }, 'counterpartsTouched');
    } else { // Otherwise post.
      makePostRequest(Routes.client_counterparts_path(this.props.clientId),
        { counterpart: this.state }, 'counterpartsTouched');
    }
  }

  handleInputChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
          value={this.state.name}
          changeEvent={this.handleInputChange}
          autoFocus="true"
          label="Namn"
          required={true}
        />
        <FormGroup
          name="personal_number"
          type="tel"
          value={this.state.personal_number}
          changeEvent={this.handleInputChange}
          label="Personnummer"
          pattern='\d*'
          required={true}
          maxLength={10}
          minLength={10}
        />
        <FormGroup
          name="representative"
          type="text"
          value={this.state.representative}
          changeEvent={this.handleInputChange}
          label="Motpartsombud"
        />
        <div className="form-group">
          <label htmlFor="info">Kontaktinfo</label>
          <textarea
            className="form-control"
            type="text-area"
            value={this.state ? this.state.info : ''}
            name="info"
            rows="4"
            onChange={this.handleInputChange}>
          </textarea>
        </div>
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

CounterPartForm.propTypes = {
  initialCounterpart: React.PropTypes.object,
  clientId: React.PropTypes.number.isRequired,
};
