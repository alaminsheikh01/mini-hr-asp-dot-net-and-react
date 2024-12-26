"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEmployee, getDepartments, getDesignations } from "@/api/employee";
import { Input, Select, Button, Typography, Row, Col } from "antd";

const { Option } = Select;
const { Title } = Typography;

const EmployeeCreate = () => {
  const [departments, setDepartments] = React.useState([]);
  const [designations, setDesignations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getDepartments(setDepartments, setLoading);
    getDesignations(setDesignations, setLoading);
  }, []);

  const initialValues = {
    firstname: "",
    lastname: "",
    department: "",
    designation: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    department: Yup.string().required("Please select a department").nullable(),
    designation: Yup.string().required("Please select a designation").nullable(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number must be digits only")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      FirstName: values.firstname,
      LastName: values.lastname,
      DepartmentId: values.department,
      DesignationId: values.designation,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      Address: values.address,
    };
    createEmployee(payload, setLoading)
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Employee Create Page
      </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="firstname" style={{ fontWeight: "bold" }}>
                    First Name:
                  </label>
                  <Field name="firstname">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter first name" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="lastname" style={{ fontWeight: "bold" }}>
                    Last Name:
                  </label>
                  <Field name="lastname">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter last name" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="department" style={{ fontWeight: "bold" }}>
                    Department:
                  </label>
                  <Field name="department">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select a department"
                        style={{ width: "100%" }}
                        onChange={(value, op) =>
                          setFieldValue("department", value)
                        }
                      >
                        {departments.map((department) => (
                          <Option
                            key={department.value}
                            value={department.value}
                          >
                            {department.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="department"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="designation" style={{ fontWeight: "bold" }}>
                    Designation:
                  </label>
                  <Field name="designation">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select a designation"
                        style={{ width: "100%" }}
                        onChange={(value, op) => {
                          setFieldValue("designation", value);
                        }}
                      >
                        {designations.map((designation) => (
                          <Option
                            key={designation.value}
                            value={designation.value}
                          >
                            {designation.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="designation"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={24}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="email" style={{ fontWeight: "bold" }}>
                    Email:
                  </label>
                  <Field name="email">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter email" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="phoneNumber" style={{ fontWeight: "bold" }}>
                    Phone Number:
                  </label>
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter phone number" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="address" style={{ fontWeight: "bold" }}>
                    Address:
                  </label>
                  <Field name="address">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter address" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="address"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Submitting..." : "Create Employee"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeCreate;
