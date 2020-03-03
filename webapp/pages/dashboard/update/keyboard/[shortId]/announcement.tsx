import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { text } from "styles/text";
import { GetProps } from "interfaces/GetProps";
import {
  useKeyboardQuery,
  useKeyboardAnnouncementMutation
} from "generated/graphql";
import { Formik } from "formik";
import { FormikInput, FormikArea } from "styles/inputs";
import { Button } from "styles/buttons";
import { useAppContext } from "hooks/useAppContext";

const KeyboardMessage: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const { loading, error, data } = useKeyboardQuery({ variables: { shortId } });
  const [keyboardAnnouncement] = useKeyboardAnnouncementMutation();
  const kb = !loading && data && data.keyboard;

  const handleSubmit = async (a: string) => {
    event.preventDefault();
    try {
      let res = await keyboardAnnouncement({
        variables: {
          id: kb.id,
          announcement: a
        }
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title="Announcement">
      {loading && <h2>Loading...</h2>}
      {error && <h2>Oops, an error occured</h2>}
      {!loading && data && data.keyboard && (
        <>
          <h1 css={text.heading}>{kb.name} announcement</h1>
          <h4>
            Create an announcement about changes or updates to your project
          </h4>
          <Formik initialValues={{ message: "" }} onSubmit={() => {}}>
            {({ values }) => (
              <form onSubmit={() => handleSubmit(values.message)}>
                <FormikArea
                  icon="icon ion-ios-information-circle"
                  margins="30px 0 10px 0"
                  type="text"
                  placeholder="Annoucement message"
                  name="message"
                />
                <Button primary="true" type="submit">
                  Post announcement
                </Button>
              </form>
            )}
          </Formik>
        </>
      )}
    </Layout>
  );
};

KeyboardMessage.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeyboardMessage;
