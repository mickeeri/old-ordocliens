class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.client ? props.client.city : '',
      email: props.client ? props.client.email : '',
      firstName: props.client ? props.client.firstName : '',
      id: props.client ? props.client.id : '',
      lastName: props.client ? props.client.lastName : '',
      lawsuitId: props.lawsuitId,
      note: props.client ? props.client.note : '',
      phoneNumber: props.client ? props.client.phoneNumber : '',
      mobile: props.client ? props.client.mobile : '',
      postCode: props.client ? props.client.postCode : '',
      ssn: props.client ? props.client.ssn : '',
      street: props.client ? props.client.street : '',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    // Validate all input fields before submitting. Only on POST.
    if (!this.state.id) {
      Array.from(e.target.getElementsByClassName('form-control')).forEach((input) => {
        this.validate(input);
      });
    }

    const alert = $('#client-form-message');

    // If it has id it is an update.
    if (this.state.id) {
      makePutRequest(
        Routes.client_path(this.state.id),
        { client: this.state })
        .done(() => {
          alert.text('Klient uppdaterad');
          alert.removeClass('text-danger');
          alert.addClass('text-success');
          alert.slideDown();
          alert.delay(1000).slideUp(300);
          // Remove green or red text when updated successfully.
          $('.form-group').removeClass('has-success');
          $('.form-group').removeClass('has-error');
        })
        .fail(xhr => {
          // TODO: DRY. Use util methods.
          if (xhr.status === 422) {
            alert.text('Formuläret innehåller fel. Rätta till dem och försök igen.');
          } else {
            alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          }
          alert.removeClass('text-success');
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
    } else { // Otherwise create new client.
      if (this.state) {
        // TODO: Use makePostRequest instead.
        $.post(Routes.clients_path(), { client: this.state }, res => {
          this.props.lawsuitId ?
            PubSub.publish('clientListUpdated') :
            window.location = res.client.link;
        })
        .fail(xhr => {
          if (xhr.status === 422) {
            alert.text('Formuläret innehåller fel. Rätta till dem och försök igen.');
          } else {
            alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          }
          alert.removeClass('text-success');
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
      }
    }
  }

  handleInputChange(e) {
    this.setState({ formTouched: true });
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  validate(e) {
    const input = e.target ? e.target : e;

    if (input.name === 'firstName') {
      validateStringLength(input.value, 40, 1, input.name, 'Förnamn');
    }
    if (input.name === 'lastName') {
      validateStringLength(input.value, 60, 1, input.name, 'Efternamn');
    }
    if (input.name === 'ssn') {
      validatePersonalNumber(input.value, input.name, true);
    }
    if (input.name === 'email') {
      validateStringLength(input.value, 255, '', input.name, 'E-post');
      validateEmail(input.value, input.name, false);
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
        <form onSubmit={this.handleOnSubmit} noValidate>
          <p className="hidden message" id="client-form-message"></p>
          <div id="firstNameGroup" className="form-group row">
            <label className="col-sm-4 form-control-label" htmlFor="firstName">Förnamn</label>
            <div className="col-sm-8">
              <input
                placeholder="Förnamn"
                type="text"
                name="firstName"
                id="firstName"
                className="form-control form-control-sm"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                onBlur={this.validate}
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
                onBlur={this.validate}
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
                onBlur={this.validate}
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
                onBlur={this.validate}
              />
              <small id="emailHelper" className="text-muted"></small>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="mobile" className="col-sm-6 form-control-label">Mobil</label>
            <div className="col-sm-6">
              <input
                placeholder="Mobil"
                type="tel"
                name="mobile"
                className="form-control form-control-sm"
                value={this.state.mobile}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phoneNumber" className="col-sm-6 form-control-label">Telefon</label>
            <div className="col-sm-6">
              <input
                placeholder="Telefon"
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
              disabled={false}
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
