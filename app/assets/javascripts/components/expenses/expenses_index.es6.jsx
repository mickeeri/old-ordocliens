class ExpensesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expenses: props.expenses };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(expense) {
    // Render modal...
    ReactDOM.render(
      <EditFormModal
        header="Redigera utlägg"
        form={
          <ExpenseForm
            lawsuitId={this.props.lawsuitId}
            initialExpense={expense}
          />
        }
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  handleDeleteClick(expenseId) {
    ReactDOM.render(
      <ConfirmDeleteModal
        target="deleteExpense"
        subToPublish="expensesTouched"
        url={Routes.lawsuit_expense_path(this.props.lawsuitId, expenseId)}
      />,
      document.getElementById('editModalContainer')
    );
    $('#deleteExpense').modal();
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr>
              <th>Notering</th>
              <th>Kostnad</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.expenses.map(expense =>
              <tr key={expense.id}>
                <td>{expense.entry}</td>
                <td className="text-nowrap">{parseFloat(expense.price).toFixed(2)} kr</td>
                <td className="center-content">
                  <i
                    className="fa fa-pencil-square-o"
                    value={expense.id}
                    onClick={() => this.handleEditClick(expense)}
                    aria-hidden="true"
                  >
                  </i>
                </td>
                <td className="center-content">
                  <i
                    className="fa fa-times"
                    onClick={() => this.handleDeleteClick(expense.id)}
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

ExpensesIndex.propTypes = {
  expenses: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
};
