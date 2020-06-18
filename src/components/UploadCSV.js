import React, { createRef } from "react";
import { CSVReader } from "react-papaparse";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

const buttonRef = createRef();

const UploadCSV = ({ active, setState, setActiveStep }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (value) => {
    const data = value[1].data;
    setState({
      address: data[0],
      bedroom: data[1],
      bathroom: data[2],
      description: data[3],
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    enqueueSnackbar("Error occured, see console for details.", {
      variant: "error",
    });
    console.log(err);
  };

  return (
    <>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
      >
        {({ file }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            style={{
              display: active === 0 ? "inline-flex" : "none",
              marginTop: "8px",
            }}
          >
            Upload as CSV
          </Button>
        )}
      </CSVReader>
    </>
  );
};

export default UploadCSV;
