const LawsuitRow = (props) => (
  <div key={props.key}>
    <hr />
    <a
      href={Routes.lawsuit_path(props.lawsuit.id)}
    >{props.lawsuit.name}
    </a>
  </div>
);

// function LawsuitRow({ lawsuit }) {
//   console.log(key);
//   return (
//     <div>
//       <hr />
//       <a
//         href={Routes.lawsuit_path(lawsuit.id)}
//       >{lawsuit.name}
//       </a>
//     </div>
//   );
// }

LawsuitRow.propTypes = {
  lawsuit: React.PropTypes.object.isRequired,
};
