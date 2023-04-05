import { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { useRouter } from "next/router";
import queryString from "query-string";
import dayjs from "dayjs";
import cn from "clsx";

import { AutoComplete, DateInput, NumberInput, Spinner } from "@/components";
import { generateQueryParam } from "@/helpers";
import { SearchFormValuesModel } from "@/models/search.model";

import RemoveIcon from "public/assets/icons/remove-icon.svg";
import MapPinIcon from "public/assets/icons/map-pin.svg";

import styles from "./search-form.module.scss";

const SearchForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const query = queryString.parse(router.asPath.split("?")[1]);

  const handleGetFormValues = (): SearchFormValuesModel => {
    const queryDestination = query.destination as string;
    let destinations = [];

    if (query.destination?.includes(",")) {
      destinations.push(...queryDestination.split(","));
    } else {
      if (queryDestination) {
        destinations.push(queryDestination);
      } else {
        destinations = [];
      }
    }

    return {
      cityOfOrigin: query.cityOfOrigin as string,
      destinations: destinations.length
        ? destinations.map((i) => ({
            city: i,
          }))
        : [],
      date: query.date ? dayjs(String(query.date), "YYYY/MM/DD") : undefined,
      passengers: query.passengers ? query.passengers : "1",
    };
  };

  // Local States
  const [formValues, setFormValues] = useState<SearchFormValuesModel>(
    handleGetFormValues()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handeSubmitForm = (formValues: SearchFormValuesModel) => {
    setSubmitLoading(true);
    const newUrl = generateQueryParam(formValues);
    router.push(`/search?${newUrl}`);
  };

  const onValuesChange = (_: unknown, allValues: SearchFormValuesModel) => {
    const newUrl = generateQueryParam(allValues);
    setFormValues(allValues);
    router.push(`?${newUrl}`, undefined, { shallow: true });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      name="searchForm"
      initialValues={handleGetFormValues()}
      onValuesChange={onValuesChange}
      onFinish={handeSubmitForm}
    >
      <div className={styles.formContainer}>
        <div className={styles.leftSteps} />

        <div className={styles.formLeftSide}>
          <div className={styles.autoCompleteField}>
            <AutoComplete
              label="City of origin"
              name="cityOfOrigin"
              hasError={form.getFieldError("cityOfOrigin").length > 0}
              rules={[
                {
                  required: true,
                  message: "You must choose the city of origin",
                },
              ]}
            />

            <div
              className={cn(
                styles.stepItem,
                styles.circleStep,
                styles.withoutBg
              )}
            />
          </div>

          <Form.List
            name="destinations"
            rules={[
              {
                validator: async (_, destinations) => {
                  if (!destinations || destinations.length < 1) {
                    return Promise.reject(
                      new Error("You must add at least 1 destination")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add: addNewField, remove: removeField }) => {
              return (
                <>
                  {fields.map(({ key, name }) => (
                    <div key={key}>
                      <div className={styles.dynamicFieldItem}>
                        <div className={styles.autoCompleteField}>
                          <AutoComplete
                            label="City of destination"
                            name={[name, "city"]}
                            hasError={
                              form.getFieldError(["destinations", name, "city"])
                                .length > 0
                            }
                            rules={[
                              {
                                required: true,
                                message:
                                  "You must choose the city of destination",
                              },
                            ]}
                          />
                          {name === fields.length - 1 ? (
                            <div
                              className={cn(styles.stepItem, styles.lastStep)}
                            >
                              <MapPinIcon />
                            </div>
                          ) : (
                            <div
                              className={cn(styles.stepItem, styles.circleStep)}
                            />
                          )}
                        </div>
                        <div
                          className={styles.dynamicFieldRemoveBtn}
                          onClick={() => removeField(name)}
                        >
                          <RemoveIcon />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Form.Item>
                    <div
                      className={styles.addDestinationBtn}
                      onClick={() => addNewField()}
                    >
                      Add destination
                    </div>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </div>

        <div className={styles.formRightSide}>
          <NumberInput
            label="Passengers"
            name="passengers"
            rules={[{ required: true, message: "Select passengers" }]}
          />

          <DateInput
            label="Date"
            name="date"
            rules={[{ required: true, message: "Select date" }]}
          />
        </div>
      </div>

      <Form.Item>
        <Button
          loading={submitLoading}
          disabled={
            !formValues.cityOfOrigin ||
            !formValues.date ||
            !formValues.destinations.length ||
            !formValues.passengers ||
            !!form.getFieldsError().filter(({ errors }) => errors.length).length
          }
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          {!submitLoading && "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
