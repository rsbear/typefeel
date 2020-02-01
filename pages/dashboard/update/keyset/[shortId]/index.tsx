import React, { useState } from "react";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";
import { useUpdateKeysetMutation, useKeysetQuery } from "generated/graphql";
import { Formik, FieldArray } from "formik";
import { text } from "styles/text";
import { FormikInput, FormikArea } from "styles/inputs";
import css from "@emotion/css";
import { colors, borderBox, margins, grid33 } from "styles/main";
import { Button } from "styles/buttons";

interface Props {
  authUser?: any;
  shortId: string;
}

const KeysetUpdate: GetProps<Props> = ({ authUser, shortId }) => {
  const [updateField, setUpdateField] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const { loading, error, data, refetch } = useKeysetQuery({
    variables: { shortId }
  });
  const [updateKeyset] = useUpdateKeysetMutation();

  const keyset = !loading && data && data.keyset;

  const initValues = {
    name: keyset.name,
    profile: keyset.profile,
    stem: keyset.stem,
    kits: keyset.kits
  };

  const kit = { kit: "", name: "", price: 0, suggestedPrice: null };

  const handleSubmit = async (values: any) => {
    event.preventDefault();
    // const editions = values.editions.map((x: any) => {
    //   const { __typename, ...rest } = x;
    //   return rest;
    // });
    const data = { ...values };
    try {
      let res = await updateKeyset({
        variables: {
          id: keyset.id,
          data
        }
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Update keyboard" authUser={authUser}>
      {loading && <h2>Loading..</h2>}
      {!loading && data && data.keyset && (
        <>
          <h1 css={text.heading}>Update {data.keyset.name}</h1>
          <ul css={editableFields}>
            <li>
              {keyset.name}
              <span onClick={() => setUpdateField("name")}>Edit</span>
            </li>
            <li>
              {keyset.profile} profile
              <span onClick={() => setUpdateField("profile")}>Edit</span>
            </li>
            <li>
              {keyset.stem} stem
              <span onClick={() => setUpdateField("stem")}>Edit</span>
            </li>
            <li>
              Kits
              <span onClick={() => setUpdateField("kits")}>Edit</span>
            </li>
          </ul>
          <Formik initialValues={initValues} onSubmit={() => {}}>
            {({ values }) => (
              <form onSubmit={() => handleSubmit(values)}>
                {(updateField === "name" || values.name !== keyset.name) && (
                  <div css={[borderBox, margins("0 0 20px 0")]}>
                    <h5>Name</h5>
                    <FormikInput
                      type="text"
                      icon="icon ion-ios-at"
                      placeholder={keyset.name}
                      name="name"
                    />
                  </div>
                )}
                {(updateField === "profile" ||
                  values.profile !== keyset.profile) && (
                  <div css={[borderBox, margins("0 0 20px 0")]}>
                    <h5>Profile</h5>
                    <FormikInput
                      type="text"
                      icon="icon ion-ios-at"
                      placeholder={keyset.profile}
                      name="profile"
                    />
                  </div>
                )}
                {(updateField === "stem" || values.stem !== keyset.stem) && (
                  <div css={[borderBox, margins("0 0 20px 0")]}>
                    <h5>Stem</h5>
                    <FormikInput
                      type="text"
                      icon="icon ion-ios-at"
                      placeholder={keyset.stem}
                      name="stem"
                    />
                  </div>
                )}
                {(updateField === "kits" || values.kits !== keyset.kits) && (
                  <FieldArray
                    name="kits"
                    render={({ push }) => (
                      <>
                        <div css={[borderBox, margins("10px 0 20px 0")]}>
                          <h5>Kits available</h5>
                          {values.kits.map((k: any, i: number) => (
                            <div css={grid33}>
                              <FormikInput
                                margins="0 0 10px 0"
                                type="text"
                                icon="icon ion-ios-at"
                                name={`kits.${i}.kit`}
                                placeholder="Type of kit"
                              />
                              <FormikInput
                                margins="0 0 10px 0"
                                type="text"
                                icon="icon ion-ios-at"
                                name={`kits.${i}.name`}
                                placeholder="Name of the kit"
                              />
                              <FormikInput
                                margins="0 0 10px 0"
                                type="number"
                                icon="icon ion-logo-usd"
                                name={`kits.${i}.price`}
                                placeholder="price of the kit"
                              />
                            </div>
                          ))}
                          <Button
                            small="true"
                            type="button"
                            onClick={() => push(kit)}
                          >
                            Add another kit
                          </Button>
                        </div>
                      </>
                    )}
                  />
                )}
                <Button type="submit" primary="true">
                  Post update
                </Button>
              </form>
            )}
          </Formik>
        </>
      )}
    </Layout>
  );
};

KeysetUpdate.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeysetUpdate;

const editableFields = css`
  margin-bottom: 40px;
  li {
    margin: 10px 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${colors.black60};

    span {
      margin-left: 20px;
      padding-left: 20px;
      color: ${colors.black30};
      text-transform: uppercase;
      border-left: solid 1px ${colors.black05};
      cursor: pointer;
    }

    p {
      margin: 10px 0;
      font-size: 14px;
    }
  }
`;
