import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  input_container: {
    padding: "0px 5px",
    // border: "1px solid black",
    width: "auto",
    margin: "15px 5px",
    borderRadius: "4px",
    border: "1px solid gray",
    height: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input_label: {
    fontSize: "10px",
  },
  input: {
    height: "30px",
    // width: "",
    outline: "none",
    border: "none",
  },
}));
export const Input = (props) => {
  const classes = useStyle();
  const { label, type, value, setValue } = props;
  //   const [value, setValue] = useState("");
  return (
    <Grid item xs className={classes.input_container}>
      <div className={classes.input_label}>{value !== "" ? label : ""}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        className={classes.input}
      />
    </Grid>
  );
};
