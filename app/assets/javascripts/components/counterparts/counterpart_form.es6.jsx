class CounterpartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.initialCounterpart ? props.initialCounterpart.id : '',
      name: props.initialCounterpart ? props.initialCounterpart.name : '',
      personalNumber: props.initialCounterpart ? props.initialCounterpart.personalNumber : '',
      representative: props.initialCounterpart ? props.initialCounterpart.representative : '',
      info: props.initialCounterpart ? props.initialCounterpart.info : '',
      lawsuitId: props.lawsuitId,
      showForm: true,
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
          <form className="form form-inline" onSubmit={this.handleOnSubmit}>
            <p className="hidden message" id="counterpart-form-message"></p>
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
                value={this.state.info}
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
        : ''}
      </div>
    );
  }
}

CounterpartForm.propTypes = {
  initialCounterpart: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    info: React.PropTypes.string.isRequired,
    personalNumber: React.PropTypes.string.isRequired,
    representative: React.PropTypes.string.isRequired,
  }),
  lawsuitId: React.PropTypes.number,
};
