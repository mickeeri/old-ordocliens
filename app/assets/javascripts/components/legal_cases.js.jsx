var LegalCases = React.createClass({
  render: function() {
    var legalCases = this.props.legalCases;
    return (
      <table className="panel-body table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Ärendenr</th>
            <th>Aktivt</th>
          </tr>
        </thead>
        <tbody>
          {legalCases.map(function(c) {
            var active;
            if (c.active === true) {
              active = "Ja";
            } else {
              active = "Nej";
            }
            return (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.id}</td>
                <td>{active}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
});
