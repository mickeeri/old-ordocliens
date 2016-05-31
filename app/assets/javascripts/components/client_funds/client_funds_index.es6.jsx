class ClientFundsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clientFunds: props.clientFunds };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(clientFund) {
    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Redigera klientmedel"
        form={
          <ClientFundForm
            lawsuitId={this.props.lawsuitId}
            initialClientFund={clientFund}
          />
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  handleDeleteClick(clientFundId) {
    ReactDOM.render(
      <ConfirmDeleteModal
        target="deleteClientFund"
        subToPublish="clientFundsTouched"
        url={Routes.lawsuit_client_fund_path(this.props.lawsuitId, clientFundId)}
      />,
      document.getElementById('editModalContainer')
    );
    $('#deleteClientFund').modal();
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr>
              <th>Datum</th>
              <th>Notering</th>
              <th>Saldo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.clientFunds.map(clientFund =>
              <tr key={clientFund.id}>
                <td className="text-nowrap">{clientFund.date}</td>
                <td>{clientFund.entry}</td>
                <td className="text-nowrap">{parseFloat(clientFund.balance)
                    .toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' })} </td>
                <td className="center-content">
                  <i
                    className="fa fa-pencil-square-o"
                    value={clientFund.id}
                    onClick={() => this.handleEditClick(clientFund)}
                    aria-hidden="true"
                  >
                  </i>
                </td>
                <td className="center-content">
                  <i
                    className="fa fa-times"
                    onClick={() => this.handleDeleteClick(clientFund.id)}
                    aria-hidden="true"
                  >
                  </i>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

ClientFundsIndex.propTypes = {
  clientFunds: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
};
