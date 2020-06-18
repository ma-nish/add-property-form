import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ImageUpload({ addFile, files }) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (Object.keys(rejectedFiles).length !== 0) {
        enqueueSnackbar("Please submit valid file type", {variant: "error"});
      } else {
        const fileType = acceptedFiles[0] && acceptedFiles[0].type && acceptedFiles[0].type.split('/')[0]
        if (fileType === 'image') {
          addFile(acceptedFiles);
        } else {
          enqueueSnackbar("Only image files are accepted.", {variant: "error"});
        }
      }
    },
    [addFile, enqueueSnackbar]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const thumbsContainer = {
    width: "150px",
    height: "150px",
    borderRadius: "5%",
    objectFit: "cover",
    objectPosition: "center",
    marginLeft: "10px",
  };

  const inputContainer = {
    width: "150px",
    height: "150px",
    borderRadius: "5%",
    objectFit: "cover",
    objectPosition: "center",
    border: " 1px dashed",
    alignItems: "center",
    marginLeft: "10px",
    padding: "10px",
    display: files.length === 4 && "none",
  };

  const thumbs = files.map((file, index) => (
    <div key={index} style={{ display: "grid" }}>
      <img style={thumbsContainer} src={file.preview} alt="profile" />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedValue === "checked" + index}
            onChange={handleChange}
            value={"checked" + index}
            style={{ marginLeft: "10px" }}
          />
        }
        label={
          selectedValue === "checked" + index ? "Feetured" : "Set as feetured"
        }
      />
    </div>
  ));

  return (
    <div style={{ display: "flex" }}>
      {files.length ? thumbs : null}
      <div {...getRootProps()} style={inputContainer}>
        <input {...getInputProps()} accept="image/*" disabled={files.length === 4} />
        <p>Drag 'n' drop, or click to select files</p>
      </div>
    </div>
  );
}

export default ImageUpload;
