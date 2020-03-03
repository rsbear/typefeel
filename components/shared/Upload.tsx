import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { borderBox, margins } from "styles/main";
import css from "@emotion/css";

interface Props {
  images: string[];
  setImages: any;
}

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isdragreject) {
    return "#ff1744";
  }
  if (props.isdragactive) {
    return "#2196f3";
  }
  // return defs.colors.grayalmostsuperlight;
};

const Upload: FC<Props> = ({ images, setImages }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setImages((prevPics: any) => {
        acceptedFiles.map((pic: any) =>
          Object.assign(pic, { preview: URL.createObjectURL(pic) })
        );
        return [...prevPics, ...acceptedFiles];
      });
    }
  });

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [images]
  );

  return (
    <div css={[borderBox, margins("0 0 20px 0")]}>
      <div {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div css={dropBox}>
            <i className="icon ion-ios-image" />
            <p>Drag and drop a photo here</p>
          </div>
        ) : (
          <>
            <div css={dropBox}>
              <i className="icon ion-ios-image" />
              <p>Drag and drop or click to add a photo</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;

const dropBox = css`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin-left: 15px;
    text-transform: uppercase;
    font-size: 14px;
  }
  &:focus {
    border: 0;
    outline: 0;
  }
`;
