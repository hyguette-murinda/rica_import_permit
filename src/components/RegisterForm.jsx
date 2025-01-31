import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import { CountryDropdown } from "react-country-region-selector";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    applicantCitizenship: "",
    id_doc_number: "",
    passport: "",
    firstName: "",
    lastName: "",
    nationality: "",
    phone: "",
    email: "",
    location: "",
    businessType: "",
    companyName: "",
    tinNumber: "",
    registrationDate: "",
    businessLocation: "",
    purposeOfImport: "",
    specifyPurposeOfImport: "",
    prodCategory: "",
    productName: "",
    weight: "",
    descriptions: "",
    unitOfMeasure: "",
    quantity: "",
  });


  const validationSchema = Yup.object().shape({
    applicantCitizenship: Yup.string().required("This field is required"),
    id_doc_number: Yup.mixed().when("applicantCitizenship", {
      is: "Rwandan",
      then: () => Yup.number().typeError("ID must be a number").required("ID number is required").positive().integer(),
      otherwise: () => Yup.mixed().notRequired(),
    }),
  
    passport: Yup.mixed().when("applicantCitizenship", {
      is: "Foreigner",
      then: () => Yup.string().required("Passport number is required"),
      otherwise: () => Yup.mixed().notRequired(),
    }),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    nationality: Yup.string().required("Nationality is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string().required("Location is required"),
    businessType: Yup.string().required("Business type is required"),
    companyName: Yup.string().required("Company name is required"),
    tinNumber: Yup.number().required("TIN number is required").positive().integer(),
    registrationDate: Yup.date().required("Registration date is required"),
    businessLocation: Yup.string().required("Business location is required"),
    purposeOfImport: Yup.string().required("Purpose of import is required"),
    prodCategory: Yup.string().required("Product category is required"),
    productName: Yup.string().required("Product name is required"),
    weight: Yup.string().required("Weight is required"),
    descriptions: Yup.string(),
    unitOfMeasure: Yup.string().required("Unit of measure is required"),
    quantity: Yup.string().required("Quantity is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCountryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      nationality: value, // Update nationality when a country is selected
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const user = {
        ...formData,
        id_doc_number: formData.applicantCitizenship === "Rwandan" ? formData.id_doc_number : null,
        passport: formData.applicantCitizenship === "Foreigner" ? formData.passport : null,
      };

      const response = await axios.post("http://localhost:5000/users/register", user);
      console.log(response.data);
      message.success("User registered successfully");

      // Send welcome email using EmailJS
      const emailParams = {
        user_email: formData.email,
        user_name: `${formData.firstName} ${formData.lastName}`,
      };

      emailjs
        .send(
          "service_8tpno95",
          "template_4fphvvn",
          emailParams,
          "1xLQwoFz0BPxvmsnL"
        )
        .then(() => {
          console.log("Email sent successfully!");
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    } catch (err) {
      console.error("Error creating user", err);
      if (err.inner) {
        err.inner.forEach((error) => {
          message.error(error.message);
        });
      } else {
        message.error("Failed to register user");
      }
    }
  };

  return (
    <div className="">
      <div className="bg-white">
        <h1 className="bold pb-4 text-[#800000] font-bold text-2xl">RICA Import Permit</h1>
        <div className="">
          <form className="p-8 w-[80%] flex flex-col gap-y-3" onSubmit={handleSubmit}>
            {/* Business Owner Details */}
            <div className="w-full border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-blue-500 text-white text-sm font-semibold p-3">Business Owner Details</div>
              <div className="p-4">
                <div className="text-sm w-full mb-4">
                  <label htmlFor="applicantCitizenship">Applicant Citizenship*</label>
                  <select
                    name="applicantCitizenship"
                    value={formData.applicantCitizenship}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Citizenship</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="Foreigner">Foreigner</option>
                  </select>
                </div>

                {formData.applicantCitizenship === "Rwandan" && (
                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="id_doc_number">Identification doc Number*</label>
                    <input
                      type="number"
                      name="id_doc_number"
                      placeholder="Enter Identification doc Number"
                      value={formData.id_doc_number}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>
                )}

                {formData.applicantCitizenship === "Foreigner" && (
                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="passport">Passport Number*</label>
                    <input
                      type="text"
                      name="passport"
                      placeholder="Enter Passport Number"
                      value={formData.passport}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="firstName">Other names*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="lastName">Surname*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
              <label htmlFor="nationality">Nationality*</label>
              <CountryDropdown
                value={formData.nationality}
                onChange={handleCountryChange}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                priorityOptions={["RW", "UG", "TZ", "KE"]} // Optional: Prioritize specific countries
              />
            </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="phone">Phone Number*</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="location">Location*</label>
                  <select
                    name="location"
                    value={formData.location}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  >
                    <option value="" disabled>Enter District</option>
                    <option value="Kigali">Kigali</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="Western Province">Western Province</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="w-full border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-blue-500 text-white text-sm font-semibold p-3">Business Details</div>
              <div className="p-4">
                <div className="text-sm w-full mb-4">
                  <div className="flex justify-between gap-4">
                    <div className="text-sm w-full">
                      <label htmlFor="businessType">Business Type*</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                        onChange={handleChange}
                      >
                        <option value="businessType" >Business Type</option>
                        <option value="retailer">Retailer</option>
                        <option value="wholesale">Wholesale</option>
                        <option value="manufacturer">Manufacturer</option>
                      </select>
                    </div>
                    <div className="text-sm w-full">
                      <label htmlFor="companyName">Company name*</label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                        value={formData.companyName}
                        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="tinNumber">TIN Number*</label>
                  <input
                    type="number"
                    name="tinNumber"
                    placeholder="Enter TIN Number"
                    value={formData.tinNumber}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="registrationDate">Registration Date*</label>
                  <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col text-sm w-full mb-4">
                  <label htmlFor="businessLocation">Business Address*</label>
                  <input
                    type="text"
                    name="businessLocation"
                    placeholder="Enter Business Address"
                    value={formData.businessLocation}
                    className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="w-full border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-blue-500 text-white text-sm font-semibold p-3">Product Information</div>
              <div className="p-4">
                <div className="text-sm w-full mb-4">
                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="purposeOfImport">Purpose of Importation*</label>
                    <select
                      name="purposeOfImport"
                      value={formData.purposeOfImport}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Purpose</option>
                      <option value="directSale">Direct Sale</option>
                      <option value="personalUse">Personal Use</option>
                      <option value="trialUse">Trial Use</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="prodCategory">Product Category*</label>
                    <select
                      name="prodCategory"
                      value={formData.prodCategory}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="generalCategory">General Purpose</option>
                      <option value="constructionMaterial">Construction Material</option>
                      <option value="chemicals">Chemicals</option>
                    </select>
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="productName">Product Name*</label>
                    <input
                      type="text"
                      name="productName"
                      placeholder="Enter Product Name"
                      value={formData.productName}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="weight">Weight*</label>
                    <input
                      type="text"
                      name="weight"
                      placeholder="Enter Weight"
                      value={formData.weight}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="unitOfMeasure">Unit of Measurement*</label>
                    <select
                      name="unitOfMeasure"
                      value={formData.unitOfMeasure}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Measurement</option>
                      <option value="kgs">Kgs</option>
                      <option value="tonnes">Tonnes</option>
                    </select>
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="quantity">Quantity of Products*</label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col text-sm w-full mb-4">
                    <label htmlFor="descriptions">Description of Products</label>
                    <input
                      type="text"
                      name="descriptions"
                      placeholder="Enter Description"
                      value={formData.descriptions}
                      className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#123e5a] font-medium rounded-lg text-sm py-2.5 text-center text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;