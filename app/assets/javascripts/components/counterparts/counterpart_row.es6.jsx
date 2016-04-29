class CounterPartRow extends React.Component {
  handleOnClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<CounterPartForm
          clientId={this.props.clientId}
          initialCounterpart={this.props.counterpart}/>}
        header="Motpart"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    var counterpart = this.props.counterpart;
    return (
      <div>
        <a onClick={this.handleOnClick.bind(this)} href="#">{counterpart.name}</a>
      </div>
    );
  }
}

CounterPartRow.propTypes = {
  counterpart: React.PropTypes.object.isRequired,
  clientId: React.PropTypes.number.isRequired,
};

// render() {
//   var counterpart = this.props.counterpart;
//   return (
//     <div>
//         <button
//           className="btn btn-link"
//           data-toggle="collapse"
//           data-target={'#' + counterpart.id}
//           aria-expanded="false"
//           aria-controls={counterpart.id}>{counterpart.name}
//         </button>
//         <div className="collapse" id={counterpart.id}>
//           <div className="card card-block">
//             <p><strong>Personnummer: </strong>{counterpart.personal_number}</p>
//             <p><strong>Motpartsombud: </strong>{counterpart.representative}</p>
//             <p><strong>Kontaktuppgift: </strong>{counterpart.info}</p>
//           </div>
//         </div>
//     </div>
//   );
// }
// }
