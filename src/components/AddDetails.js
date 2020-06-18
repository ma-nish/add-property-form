import React from "react";
import TextField from "@material-ui/core/TextField";

const AddDetails = ({ classes, state, setState }) => {
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <form className={classes.form} autoComplete="off">
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Address *"
        variant="outlined"
        type="text"
        name="address"
        value={state.address}
        onChange={handleChange}
      />
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Bedroom *"
        variant="outlined"
        type="number"
        name="bedroom"
        value={state.bedroom}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 10);
        }}
        onChange={handleChange}
      />
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Bathroom *"
        variant="outlined"
        type="number"
        name="bathroom"
        value={state.bathroom}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 5);
        }}
        onChange={handleChange}
      />
      <TextField
        className={classes.input}
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        name="description"
        value={state.description}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddDetails;
