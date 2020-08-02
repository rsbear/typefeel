import { FC, Fragment } from "react";
import { Sans, Grid, Image, Box } from "@rsbear/betsy";

import MainLayout from "../../components/Layouts/MainLayout";

const Keyboards: FC<any> = () => {
  const fakeDate = [
    { id: "1", name: "keyboard", size: "65%", img: "" },
    { id: "2", name: "keyboard", size: "65%", img: "" },
    { id: "3", name: "keyboard", size: "65%", img: "" },
    { id: "4", name: "keyboard", size: "65%", img: "" },
    { id: "5", name: "keyboard", size: "65%", img: "" },
    { id: "6", name: "keyboard", size: "65%", img: "" },
  ];
  return (
    <MainLayout>
      <Sans fontSize="18px" fontWeight={500}>
        keyboards / group buys
      </Sans>
      <Grid preset={2} columnGap={20} rowGap={20}>
        {fakeDate.slice(0, 2).map((fake) => (
          <Fragment>
            <Box height="100%" width="100%">
              <Image src={fake.img} shape="square" backgroundColor="gray" />
              <Sans>{fake.name}</Sans>
              <Sans>{fake.size}</Sans>
            </Box>
          </Fragment>
        ))}
      </Grid>
      <Sans fontSize="18px" fontWeight={500} mt="40px">
        keyboards / interest checks
      </Sans>
    </MainLayout>
  );
};

export default Keyboards;
