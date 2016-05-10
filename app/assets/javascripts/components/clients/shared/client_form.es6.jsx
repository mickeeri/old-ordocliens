class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.client ? props.client.id : '',
      firstName: props.client ? props.client.firstName : '',
      lastName: props.client ? props.client.lastName : '',
      ssn: props.client ? props.client.ssn : '',
      email: props.client ? props.client.email : '',
      phoneNumber: props.client ? props.client.phoneNumber : '',
      street: props.client ? props.client.street : '',
      postCode: props.client ? props.client.postCode : '',
      city: props.client ? props.client.city : '',
      note: props.client ? props.client.note : '',
      lawsuitId: props.lawsuitId,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state && this.state.id) { // If it has id it is an update.
      makePutRequest(Routes.client_path(this.state.id),
        { client: this.state }, 'clientUpdated');
    } else {
      if (this.state) { // Otherwise create new client.
        // const action = this.props.lawsuitId ? 'clientListUpdated' : 'redirect';
        // makePostRequest(Routes.clients_path(), { client: this.state }, action);
        $.post(Routes.clients_path(), { client: this.state }, res => {
          this.props.lawsuitId ?
            PubSub.publish('clientListUpdated') :
            window.location = res.client.link;
        })
        .fail(xhr => {
          console.error(xhr.responseText, xhr.status, xhr.statusText);
        })
      }
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    if (this.props.lawsuitId) { // On lawsuit page.
      PubSub.publish('dismissEdit');
    } else { // On client new page.
      window.location = Routes.clients_path();
    }
  }

  render() {
    const isEdit = this.state !== '' && this.state.id !== '';
    return (
      <div>
        <h3>{this.props.header}</h3>
        <form className="form-inline" onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Förnamn</label>
            <input
              type="text"
              name="firstName"
              className="form-control form-control-sm"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Efternamn</label>
            <input
              type="text"
              name="lastName"
              className="form-control form-control-sm"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ssn">Personnummer</label>
            <input
              type="tel"
              name="ssn"
              className="form-control form-control-sm"
              value={this.state.ssn}
              onChange={this.handleInputChange}
              required="true"
              maxLength="11"
              minLength="11"
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-sm"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Mobil</label>
            <input
              type="tel"
              name="phoneNumber"
              className="form-control form-control-sm"
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="street">Gatuadress</label>
            <input
              type="text"
              name="street"
              className="form-control form-control-sm"
              value={this.state.street}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postCode">Postnummer</label>
            <input
              type="number"
              name="postCode"
              className="form-control form-control-sm"
              value={this.state.postCode}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ort</label>
            <input
              type="text"
              name="city"
              className="form-control form-control-sm"
              value={this.state.city}
              onChange={this.handleInputChange}
            />
          </div>
          <hr />
          <div className="form-group form-group-textarea">
            <label htmlFor="note">Anteckningar</label>
            <textarea
              className="form-control"
              type="text-area"
              value={this.state ? this.state.note : ''}
              name="note"
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
            <button
              className="btn btn-success"
              type="submit"
            >{isEdit ? 'Uppdatera' : 'Spara klient'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ClientForm.propTypes = {
  client: React.PropTypes.object,
  header: React.PropTypes.string,
  lawsuitId: React.PropTypes.number,
};
