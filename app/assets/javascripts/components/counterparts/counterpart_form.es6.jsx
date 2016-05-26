class CounterpartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.initialCounterpart ? props.initialCounterpart.id : '',
      firstName: props.initialCounterpart ? props.initialCounterpart.firstName : '',
      lastName: props.initialCounterpart ? props.initialCounterpart.lastName : '',
      personalNumber: props.initialCounterpart ? props.initialCounterpart.personalNumber : '',
      representative: props.initialCounterpart ? props.initialCounterpart.representative : '',
      info: props.initialCounterpart ? props.initialCounterpart.info : '',
      lawsuitId: props.lawsuitId,
      showForm: true,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleOnSubmit(e);
    }
  }

  handleOnSubmit(e) {
    e.preventDefault();
    // List in LawsuitCounterpartList;
    if (this.state.id) { // If it has id it is update.
      makePutRequest(Routes.counterpart_path(this.state.id),
        { counterpart: this.state })
        .done(() => {
          // TODO: Could move this to utils.
          const alert = $('#counterpart-form-message');
          alert.text('Motpart uppdaterad!');
          alert.removeClass('text-danger');
          alert.addClass('text-success');
          alert.slideDown();
          alert.delay(1000).slideUp(300);
        })
        .fail(xhr => {
          const alert = $('#counterpart-form-message');
          if (xhr.status === 422) {
            alert.text('Formuläret innehåller fel. Rätta till dem och försök igen.');
          } else {
            alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          }
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
    } else { // Otherwise post.
      makePostRequest(Routes.counterparts_path(), { counterpart: this.state })
        .done(() => {
          // Replace form with success message.
          this.setState({ showForm: false });
          showAlertInModal(
            `Motpart ${this.state.name} tillagd!`,
            '#counterpart-modal-alert',
            'alert-success',
            'fa-check');
          setTimeout(() => {
            PubSub.publish('counterpartListUpdated');
          }, 1000);
        })
        .fail(xhr => {
          const alert = $('#counterpart-form-message');
          if (xhr.status === 422) {
            alert.text('Formuläret innehåller fel. Rätta till dem och försök igen.');
          } else {
            alert.text(`Fel uppstod. Statuskod: ${xhr.status}`);
          }
          alert.addClass('text-danger');
          alert.slideDown(300);
        });
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
      <div>
        <div className="alert modal-alert" id="counterpart-modal-alert">
          <i className="fa" id="counterpart-modal-alert-icon" aria-hidden="true"></i>
          <span id="counterpart-modal-alert-span"></span>
        </div>
        {this.state.showForm ?
          <form onSubmit={this.handleOnSubmit} onKeyPress={this.handleKeyPress}>
            <p className="hidden message" id="counterpart-form-message"></p>
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
            <div id="personalNumberGroup" className="form-group row">
              <label
                htmlFor="personalNumber"
                className="col-sm-8 form-control-label"
              >Personnummer</label>
              <div className="col-sm-4">
                <input
                  placeholder="ÅÅMMDD-XXXX"
                  type="tel"
                  name="personalNumber"
                  id="personalNumber"
                  className="form-control form-control-sm"
                  value={this.state.personalNumber}
                  onChange={this.handleInputChange}
                  onBlur={this.validate}
                />
                <small id="personalNumberHelper" className="text-muted"></small>
              </div>
            </div>
            <div id="representativeGroup" className="form-group row">
              <label
                className="col-sm-4 form-control-label"
                htmlFor="representative"
              >Motpartsombud</label>
              <div className="col-sm-8">
                <input
                  placeholder="Motpartsombud"
                  type="text"
                  name="representative"
                  id="representative"
                  className="form-control form-control-sm"
                  value={this.state.representative}
                  onChange={this.handleInputChange}
                  onBlur={this.validate}
                  autoFocus={!isEdit}
                />
                <small id="representativeHelper" className="text-muted"></small>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="info" className="form-control-label">Kontaktinfo</label>
              <div className="col-sm-12">
                <textarea
                  placeholder="Kontaktinfo/Anteckning"
                  className="form-control"
                  type="text-area"
                  value={this.state ? this.state.info : ''}
                  name="info"
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
              <button className="btn btn-success" type="submit">
                {isEdit ? 'Uppdatera' : 'Spara motpart'}
              </button>
            </div>
          </form>
        : ''}
      </div>
    );
  }
}

CounterpartForm.propTypes = {
  initialCounterpart: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    info: React.PropTypes.string.isRequired,
    personalNumber: React.PropTypes.string.isRequired,
    representative: React.PropTypes.string.isRequired,
  }),
  lawsuitId: React.PropTypes.number,
};
