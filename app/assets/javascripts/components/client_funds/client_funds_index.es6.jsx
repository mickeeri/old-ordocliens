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
        resourceName="klientmedel"
        url={Routes.lawsuit_client_fund_path(this.props.lawsuitId, clientFundId)}
      />,
      document.getElementById('editModalContainer')
    );
    $('#deleteClientFund').modal();
  }

  render() {
    const sum = this.props.clientFunds.sum !== "0.0" ?
      parseFloat(this.props.clientFunds.sum).format(2, 3, ' ', ',') :
      "0,00";
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
          <tfoot>
            <tr>
              <td>Summa: </td>
              <td></td>
              <td className="text-nowrap">{sum}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
          <tbody>
            {this.props.clientFunds.clientFundsArray.map(clientFund =>
              <tr key={clientFund.id}>
                <td className="text-nowrap">{clientFund.date}</td>
                <td>{clientFund.entry}</td>
                <td className="text-nowrap">
                  {parseFloat(clientFund.balance).format(2, 3, ' ', ',')}
                </td>
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
  clientFunds: React.PropTypes.shape({
    clientFundsArray: React.PropTypes.array.isRequired,
    sum: React.PropTypes.string.isRequired,
  }),
  lawsuitId: React.PropTypes.number.isRequired,
};
