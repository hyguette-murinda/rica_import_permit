import React, { useState } from "react";
import emailjs from "@emailjs/browser"; 
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";

const SignUpForm = () => {
  const [applicantCitizenship, setApplicantCitizenship] = useState("");
  const [id_doc_number, setId_doc_number] = useState("");
  const [passport, setPassport] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [registrationDate, setRegistrationDate] =useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [purposeOfImport, setPurposeOfImport] = useState("");
  const [specifyPurposeOfImport, setSpecifyPurposeOfImport] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [quantity, setQuantity] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    // const validationSchema = Yup.object().shape({
      const validationSchema = Yup.object().shape({
        applicantCitizenship: Yup.string().required("This field is required"),
        id_doc_number: Yup.number().required("ID number must be 16 digits"),
        passport: Yup.string(),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email().required("Email is required"),
        nationality: Yup.string().required("Nationality is required"),
        location: Yup.string().required("Location is required"),
        businessType: Yup.string().required("Business type is required"),
        companyName: Yup.string().required("Company name is required"),
        phone: Yup.number().required("Phone number is required"),
        tinNumber: Yup.number().required("tin number is required"),
        registrationDate: Yup.string().required("Registration date is required"),
        businessLocation: Yup.string().required("Business location is required"),
        purposeOfImport: Yup.string().required("Purpose of import is required"),
        prodCategory: Yup.string().required("Product category is required"),
        productName: Yup.string().required("Product name is required"),
        unitOfMeasure: Yup.string().required("Unit of measure is required"),
        descriptions: Yup.string().required("Descriptions is required"),
      });

    try {
      await validationSchema.validate({ applicantCitizenship, id_doc_number, email, passport, nationality, firstName, lastName,
        location, businessType, companyName, phone, tinNumber, registrationDate, businessLocation, purposeOfImport, prodCategory, productName, weight, descriptions, unitOfMeasure, quantity, descriptions });


      const user = { applicantCitizenship,
        id_doc_number,
        passport,
        firstName,
        lastName,
        nationality,
        phone,
        email,
        location,
        businessType,
        companyName,
        tinNumber,
        registrationDate,
        businessLocation,
        purposeOfImport,
        specifyPurposeOfImport,
        prodCategory,
        productName,
        weight,
        descriptions,
        unitOfMeasure,
        quantity,};

      // Sending user data to backend
      const response = await axios.post("http://localhost:5000/users/register", user);
      console.log(response.data);
      message.success("User registered successfully");

      // Send welcome email using EmailJS
      const emailParams = {
        user_email: email,
        user_name: `${applicantCitizenship} ${id_doc_number}`,
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
      message.error("Failed to register user");
    }
  };

  return (
    <div className="">
      <div className=" bg-white ">

            <h1 className="bold pb-4 text-[#800000] font-bold text-2xl">RICA Import Permit</h1>
     <div className="">
          <form className="p-8 w-[80%] flex flex-col gap-y-3" onSubmit={handleSubmit}>
              
            <div className="w-full border border-gray-300 rounded-md overflow-hidden">
  {/* Section Title */}
  <div className="bg-blue-500 text-white text-sm font-semibold p-3">
    Business Owner Details
  </div>

  {/* Citizenship Dropdown */}
  <div className="p-4">
    <div className="text-sm w-full mb-4">
      <label htmlFor="applicantCitizenship">Applicant Citizenship*</label>
      <select
        name="applicantCitizenship"
        value={applicantCitizenship}
        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
        onChange={(e) => setApplicantCitizenship(e.target.value)}
      >
        <option value="" disabled>Select Citizenship</option>
        <option value="Rwandan">Rwandan</option>
        <option value="Foreigner">Foreigner</option>
      </select>
    </div>

    {/* Identification Document Number (Only for Rwandan) */}
    {applicantCitizenship === "Rwandan" && (
      <div className="flex flex-col text-sm w-full mb-4">
        <label htmlFor="id_doc_number">Identification doc Number*</label>
        <input
          type="text"
          name="id_doc_number"
          placeholder="Enter Identification doc Number"
          value={id_doc_number}
          className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
          onChange={(e) => setId_doc_number(e.target.value)}
          required
        />
      </div>
    )}

    {/* Passport Number (Only for Foreigner) */}
    {applicantCitizenship === "Foreigner" && (
      <div className="flex flex-col text-sm w-full">
        <label htmlFor="passport">Passport Number*</label>
        <input
          type="text"
          name="passport"
          placeholder="Enter Passport Number"
          value={passport}
          className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
          onChange={(e) => setPassport(e.target.value)}
          required
        />
      </div>
    )}
                <div className="flex flex-col text-sm w-full">
              <label htmlFor="firstName">Other names*</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="lastName">Surname*</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="lastName">Nationality*</label>
              <input
                type="text"
                name="nationality"
                value={nationality}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="email">Phone Number*</label>
              <input
                type="phone"
                name="phone"
                placeholder="Enter phone number"
                value={phone}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={email}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            

            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Location*</label>
              <select
                  name="applicantCitizenship"
                  value={location}
                  className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                   onChange={(e) => setLocation(e.target.value)}
              >
              <option value="" disabled>Enter Disctrict</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Foreigner">Foreigner</option>
              </select>
            </div>
  </div>
</div>

<div className="w-full border border-gray-300 rounded-md overflow-hidden ">
<div className="bg-blue-500 text-white text-sm font-semibold p-3">
    Business Details
  </div>
<div className="p-4">
<div className="text-sm w-full mb-4">
        <div className="flex justify-between">
            <div className=" text-sm w-full">
              <label htmlFor="password">Business Type*</label>
              <select
        name="businessType"
        value={businessType}
        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
        onChange={(e) => setBusinessType(e.target.value)}
      >
        <option value="" disabled>Business Type</option>
        <option value="retailer">Retailer</option>
        <option value="wholescale">Wholescale</option>
        <option value="manufacturer">Manufacturer</option>
      </select>
            </div>
            <div className=" text-sm w-full">
              <label htmlFor="password">Company name*</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={companyName}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Tin Number*</label>
              <input
                type="text"
                name="tinNumber"
                placeholder="Enter TIn NUmber"
                value={tinNumber}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setTinNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Registration Date*</label>
              <input
                type="text"
                name="registrationDate"
                placeholder="Minimum 8 characters"
                value={registrationDate}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setRegistrationDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Business Address*</label>
              <input
                type="text"
                name="registrationDate"
                placeholder="Minimum 8 characters"
                value={businessLocation}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setBusinessLocation(e.target.value)}
              />
            </div>
</div>
</div>
</div>

<div className="w-full border border-gray-300 rounded-md overflow-hidden">
<div className="bg-blue-500 text-white text-sm font-semibold p-3">
    Product Information
  </div>
<div className="p-4">
<div className="text-sm w-full mb-4">
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Purpose of Importation*</label>
              <select
        name="purposeOfImportation"
        value={purposeOfImport}
        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
        onChange={(e) => setPurposeOfImport(e.target.value)}
      >
        <option value="directSale" disabled>Direct Sale</option>
        <option value="personalUse">Personal Use</option>
        <option value="trialUse">Trial Use</option>
        <option value="other">Other</option>
      </select>
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Product Category*</label>
              <select
        name="prodCategory"
        value={prodCategory}
        className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
        onChange={(e) => setProdCategory(e.target.value)}
      >
        <option value="generalCategory" >General Purpose</option>
        <option value="constructionMaterial">Constraction Material</option>
        <option value="chemicals">Chemicals</option>
      </select>
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Product Name*</label>
              <input
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={productName}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Weight*</label>
              <input
                type="text"
                name="weight"
                placeholder="Minimum 8 characters"
                value={weight}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Unit of measurement*</label>
              <input
                type="text"
                name="unitOfMeasure"
                placeholder="Minimum 8 characters"
                value={unitOfMeasure}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setUnitOfMeasure(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">QUantity of Products*</label>
              <input
                type="text"
                name="quantity"
                placeholder="Enter Quantity"
                value={quantity}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm w-full">
              <label htmlFor="password">Description of Products*</label>
              <input
                type="text"
                name="descriptions"
                value={descriptions}
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setDescriptions(e.target.value)}
              />
            </div>
</div>
</div>
</div>
            <button className="w-full bg-[#123e5a] font-medium rounded-lg text-sm py-2.5 text-center text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
