import { FC } from "react";
import { RecoilRoot } from "recoil";

const NoNavLayout: FC<any> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default NoNavLayout;
