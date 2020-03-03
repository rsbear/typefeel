import React, { FC, useState, useEffect, SetStateAction } from "react";

import { useAppContext } from "hooks/useAppContext";
import { useRouter } from "next/router";
import { useMakeKeysetMutation, KeysetInput } from "generated/graphql";

import Layout from "components/layouts/Layout";
import Upload from "components/shared/Upload";
import UploadPreview from "components/shared/UploadPreview";

import { Formik, FieldArray } from "formik";
import { FormikInput, FormikArea } from "styles/inputs";
import css from "@emotion/css";
import { Button, DeleteButton } from "styles/buttons";
import { margins, borderBox, grid50, grid33, colors, flex } from "styles/main";
import { text } from "styles/text";

const initValues = {
  name: "",
  manufacturer: "",
  profile: "",
  stem: "",
  kits: [{ kit: "", name: "", price: 0, suggestedPrice: null }],
  colors: [],
  details: [""],
  interestCheck: true,
  market: false,
  groupBuy: false,
  groupBuySoon: false,
  closed: false
};

const kit = {
  kit: "",
  name: "",
  price: 0,
  suggestedPrice: null
};

const color = {
  hex: "",
  ral: ""
};

const CreateKeyset: FC<any> = () => {
  const { authUser } = useAppContext();
  const [images, setImages] = useState([]);
  const [errors, setErrors]: SetStateAction<any> = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [makeKeyset, { client }] = useMakeKeysetMutation();

  const validator = (values: any) => {
    const errObj = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value === "" || value === 0) {
        errObj[key] = `Please provide a ${key}`;
      }
    });

    for (let v of values.details) {
      if (v.length <= 0) {
        errObj["details"] =
          "Surely you have something to say about this project";
      }
    }

    if (images.length < 5) {
      errObj["images"] = "You must provide at least 5 pictures";
    }

    if (Object.entries(errObj).length > 0) {
      setErrors(errObj);
    } else {
      setErrors(false);
    }
  };

  const handleSubmit = async (data: KeysetInput) => {
    event.preventDefault();
    validator(data);
    setLoading(true);

    if (errors) {
      setLoading(false);
    }

    if (errors === false) {
      try {
        let res = await makeKeyset({ variables: { data, images } });
        if (res && res.data) {
          await client!.resetStore().then(() => {
            router.push(`/keyset/${res.data.makeKeyset.message}`);
          });
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <Layout title="Create keyset">
      <h1 css={[text.heading, margins("20px 0")]}>Create a keyset</h1>
      <Formik initialValues={initValues} onSubmit={() => {}}>
        {({ values }) => (
          <form onSubmit={() => handleSubmit(values)}>
            <div css={borderBox}>
              <h5>Project name</h5>
              {errors && errors.name && <h5 css={errText}>{errors.name}</h5>}
              <FormikInput
                autoFocus
                type="text"
                icon="icon ion-ios-at"
                name="name"
                placeholder="Name"
              />
            </div>
            <div css={[margins("20px 0"), borderBox]}>
              <h5>Manufacturer, profile, and stem</h5>
              <div css={grid33}>
                <div>
                  {errors && errors.manufacturer && (
                    <h5 css={errText}>{errors.manufacturer}</h5>
                  )}
                  <FormikInput
                    type="text"
                    icon="icon ion-ios-settings"
                    name="manufacturer"
                    placeholder="e.g. GMK, DSA, KAT, SA"
                  />
                </div>
                <div>
                  {errors && errors.profile && (
                    <h5 css={errText}>{errors.profile}</h5>
                  )}
                  <FormikInput
                    type="text"
                    icon="icon ion-ios-cube"
                    name="profile"
                    placeholder="e.g. Cherry, SA, DSA, KAT"
                  />
                </div>
                <div>
                  {errors && errors.stem && (
                    <h5 css={errText}>{errors.stem}</h5>
                  )}
                  <FormikInput
                    type="text"
                    icon="icon ion-ios-add-circle-outline"
                    name="stem"
                    placeholder="e.g. Cherry MX, Topre, Alps"
                  />
                </div>
              </div>
            </div>
            <h3 css={margins("40px 0 0 0")}>Add available kits</h3>
            <FieldArray
              name="kits"
              render={({ push, remove }) => (
                <>
                  <div css={[borderBox, margins("10px 0 20px 0")]}>
                    <h5>Kits available</h5>
                    {!values.kits && (
                      <Button
                        small="true"
                        type="button"
                        onClick={() => push(kit)}
                      >
                        Add a kit
                      </Button>
                    )}
                    {values.kits &&
                      values.kits.length > 0 &&
                      values.kits.map((_: any, idx: number) => (
                        <>
                          <div css={flex.row}>
                            <div css={[grid33, test]}>
                              <FormikInput
                                margins="0 0 10px 0"
                                type="text"
                                icon="icon ion-ios-at"
                                name={`kits.${idx}.kit`}
                                placeholder="Type of kit"
                              />
                              <FormikInput
                                margins="0 0 10px 0"
                                type="text"
                                icon="icon ion-ios-at"
                                name={`kits.${idx}.name`}
                                placeholder="Name of the kit"
                              />
                              <FormikInput
                                margins="0 0 10px 0"
                                type="number"
                                icon="icon ion-logo-usd"
                                name={`kits.${idx}.price`}
                                placeholder="price of the kit"
                              />
                            </div>
                            <DeleteButton
                              icon="icon ion-ios-trash"
                              onClick={() => remove(idx)}
                            />
                          </div>
                          <Button
                            small="true"
                            type="button"
                            onClick={() => push(values.kits[0])}
                          >
                            Add another kit
                          </Button>
                        </>
                      ))}
                  </div>
                </>
              )}
            />
            <FieldArray
              name="colors"
              render={({ push, remove }) => (
                <div css={[borderBox, margins("20px 0")]}>
                  {!values.colors || values.colors.length <= 0 ? (
                    <>
                      <h5>Do you want to provide colors?</h5>
                      <Button
                        type="button"
                        small="true"
                        onClick={() => push({ hex: "", ral: "" })}
                      >
                        Add a color
                      </Button>
                    </>
                  ) : (
                    <h5>Colors</h5>
                  )}
                  {values.colors && values.colors.length > 0 && (
                    <>
                      {values.colors.map((c: any, idx: number) => (
                        <div css={flex.row}>
                          <div css={[grid50, test]}>
                            <FormikInput
                              type="text"
                              margins="0 0 10px 0"
                              icon="icon ion-ios-color-palette"
                              name={`colors.${idx}.hex`}
                              placeholder="Hex code without the #"
                            />
                            <FormikInput
                              type="text"
                              margins="0 0 10px 0"
                              icon="icon ion-ios-color-fill"
                              name={`colors.${idx}.ral`}
                              placeholder="RAL color chip"
                            />
                          </div>
                          <DeleteButton
                            icon="icon ion-ios-trash"
                            onClick={() => remove(idx)}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        small="true"
                        onClick={() => push(color)}
                      >
                        Add a color
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
            <div css={borderBox}>
              <h5>Details</h5>
              <FieldArray
                name="details"
                render={({ push }) => (
                  <>
                    {values.details.map((x: any, i: number) => (
                      <FormikArea
                        icon="icon ion-ios-information-circle"
                        margins="0 0 10px 0"
                        type="text"
                        placeholder={`The story part ${i + 1}`}
                        name={`details.${i}`}
                      />
                    ))}
                    <Button small="true" onClick={() => push("")}>
                      Add another
                    </Button>
                  </>
                )}
              />
            </div>
            <h2 css={margins("60px 0 10px 0")}>Image gallery</h2>
            {errors && errors.images && <h5 css={errText}>{errors.images}</h5>}
            <Upload images={images} setImages={setImages} />
            <UploadPreview images={images} setImages={setImages} />

            <Button primary="true" type="submit">
              Submit keyset post
            </Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateKeyset;

const errText = css`
  color: red;
`;

const test = css`
  width: 100%;
`;
