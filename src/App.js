import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";

import ImageUpload from "./components/ImageUpload";
import AddDetails from "./components/AddDetails";
import UploadCSV from "./components/UploadCSV";

import "./components/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  input: {
    paddingBottom: theme.spacing(1),
  },
  form: {
    display: "grid",
    width: "100%",
  },
  container: {
    marginTop: "5%",
  },
}));

function getSteps() {
  return ["Select a method", "Fill details", "Upload images"];
}

function getStepContent(step, classes, addFile, files, state, setState) {
  switch (step) {
    case 0:
      return;
    case 1:
      return <AddDetails classes={classes} state={state} setState={setState} />;
    case 2:
      return <ImageUpload addFile={addFile} files={files} />;
    default:
      return "Unknown step";
  }
}

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [state, setState] = useState({
    address: "",
    bedroom: "",
    bathroom: "",
    description: "",
  });
  const steps = getSteps();

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const addFile = (file) => {
    setFiles([
      ...files,
      ...file.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  const handleSubmit = async () => {
    const array = files.map(async (file, index) => {
      let blobPromise = await new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      return blobPromise;
    });

    const images = await Promise.all(array);
    
    console.clear();
    console.log("Result: ", {
      ...state,
      images,
    });
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return;
      case 1:
        if (state.address && state.bedroom && state.bathroom) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          enqueueSnackbar("* fields are mandatory.", { variant: "error" });
        }
        return;
      case 2:
        if (files.length) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          handleSubmit();
        } else {
          enqueueSnackbar("Upload atleast one image.", { variant: "error" });
        }
        return;
      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container} maxWidth="md">
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(
                    index,
                    classes,
                    addFile,
                    files,
                    state,
                    setState
                  )}
                  <div className={classes.actionsContainer}>
                    <div style={{ display: 'inline-flex' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === 0 ? "Add from Scratch" : "Submit"}
                      </Button>
                      <UploadCSV active={activeStep} setState={setState} setActiveStep={setActiveStep} />
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                You&apos;re finished - Checkout console logs.
              </Typography>
            </Paper>
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
