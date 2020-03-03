import React, { FC } from "react";
import css from "@emotion/css";
import { flex } from "styles/main";

interface Props {
  images: any[];
  setImages: any;
}

const UploadPreview: FC<Props> = ({ images, setImages }) => {
  const handleRemove = (idx: number) => {
    setImages((prevImages: any[]) => {
      return [...prevImages].filter((_: any, i: number) => i !== idx);
    });
  };

  return (
    <div css={[flex.row, wrapper]}>
      {images.map(({ preview, lastModified }, idx: number) => (
        <div css={picturewrapper} key={lastModified}>
          <i className="icon ion-md-trash" onClick={() => handleRemove(idx)} />
          <img src={preview} alt="Picture" />
        </div>
      ))}
    </div>
  );
};

export default UploadPreview;

const wrapper = css`
  margin-top: 30px;
`;
const picturewrapper = css`
  position: relative;
  height: 300px;
  width: 300px;
  i {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    z-index: 3;
    margin: 0 15px;
    border-radius: 4px;
    background: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: indianred;
    }
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
