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
      hasError: false,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();

    if (this.state.hasError) {
      return false;
    }

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
        });
      }
    }
  }

  handleInputChange(e) {
    // if (e.target.name === 'ssn') {
    //   if (!validatePersonalNumber(
    //     e.target.value,
    //     e.target.name,
    //     false
    //   )) {
    //     return false;
    //   }
    // }

    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleOnBlur(e) {
    this.setState({ hasError: false });

    if (e.target.name === 'firstName' || e.target.name === 'lastName') {
      if (!validateStringLength(
        e.target.value,
        10,
        e.target.name,
        'Förnamn')) {
        this.setState({ hasError: true });
      }
    }

    if (e.target.name === 'ssn') {
      if (!validatePersonalNumber(
        e.target.value,
        e.target.name,
        true
      )) {
        this.setState({ hasError: true });
      }
    }

    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value, e.target.name)) {
        this.setState({ hasError: true });
      }
    }
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
        <hr />
        <form onSubmit={this.handleOnSubmit} noValidate>
          <div id="firstNameGroup" className="form-group row">
            <label className="col-sm-4 form-control-label" htmlFor="firstName">Förnamn</label>
            <div className="col-sm-8">
              <input
                placeholder="Förnamn"
                type="text"
                name="firstName"
                id="firstName"
                className="form-control form-control-sm col-sm-10"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                onBlur={this.handleOnBlur}
                onBluir
                autoFocus={!isEdit}
              />
              <small id="firstNameHelper" className="text-muted"></small>
            </div>
          </div>
          <div id="lastNameGroup" className="form-group row">
            <label htmlFor="lastName" className="col-sm-4 form-control-label">Efternamn</label>
            <div className="col-sm-8">
              <input
                type="text"
                placeholder="Efternamn"
                name="lastName"
                id="lastName"
                className="form-control form-control-sm"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                onBlur={this.handleOnBlur}
                required="true"
              />
              <small id="lastNameHelper" className="text-muted"></small>
            </div>
          </div>
          <div id="ssnGroup" className="form-group row">
            <label htmlFor="ssn" className="col-sm-8 form-control-label">Personnummer</label>
            <div className="col-sm-4">
              <input
                placeholder="ÅÅMMDD-XXXX"
                type="tel"
                name="ssn"
                id="ssn"
                className="form-control form-control-sm"
                value={this.state.ssn}
                onChange={this.handleInputChange}
                onBlur={this.handleOnBlur}
              />
              <small id="ssnHelper" className="text-muted"></small>
            </div>
          </div>
          <hr />
          <div id="emailGroup" className="form-group row">
            <label htmlFor="email" className="col-sm-4 form-control-label">E-post</label>
            <div className="col-sm-8">
              <input
                placeholder="E-post"
                id="email"
                type="email"
                name="email"
                className="form-control form-control-sm"
                value={this.state.email}
                onChange={this.handleInputChange}
                onBlur={this.handleOnBlur}
              />
              <small id="emailHelper" className="text-muted"></small>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phoneNumber" className="col-sm-6 form-control-label">Mobil</label>
            <div className="col-sm-6">
              <input
                placeholder="Mobil"
                type="tel"
                name="phoneNumber"
                className="form-control form-control-sm"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <hr />
          <div className="form-group row">
            <label htmlFor="street" className="col-sm-4 form-control-label">Gatuadress</label>
            <div className="col-sm-8">
              <input
                placeholder="Gatuadress"
                type="text"
                name="street"
                className="form-control form-control-sm"
                value={this.state.street}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="postCode" className="col-sm-8 form-control-label">Postnummer</label>
            <div className="col-sm-4">
              <input
                placeholder="Postnummer"
                type="number"
                name="postCode"
                className="form-control form-control-sm"
                value={this.state.postCode}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-sm-4 form-control-label">Ort</label>
            <div className="col-sm-8">
              <input
                placeholder="Ort"
                type="text"
                name="city"
                className="form-control form-control-sm"
                value={this.state.city}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <hr />
          <div className="form-group row">
            <label htmlFor="note" className="form-control-label">Anteckningar</label>
            <div className="col-sm-12">
              <textarea
                placeholder="Anteckningar"
                className="form-control"
                type="text-area"
                value={this.state ? this.state.note : ''}
                name="note"
                rows="4"
                onChange={this.handleInputChange}
              >
              </textarea>
            </div>
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
