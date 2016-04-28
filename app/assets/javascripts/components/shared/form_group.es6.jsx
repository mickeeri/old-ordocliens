class FormGroup extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          className="form-control form-control-sm"
          type={this.props.type}
          name={this.props.name}
          defaultValue={this.props.value}
          autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
          onChange={this.props.changeEvent}
          required={this.props.required}
          maxLength={this.props.maxLength}
          pattern={this.props.pattern}
          minLength={this.props.minLength}
          step={this.props.step}
          min={this.props.min}/>
      </div>
    );
  }
}
