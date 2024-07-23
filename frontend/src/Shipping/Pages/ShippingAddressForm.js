import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const Category = [
  { value: "...." },
  { value: "Central Province" },
  { value: "Eastern Province" },
  { value: "Northern Province" },
  { value: "Southern Province " },
  { value: "Western Province " },
  { value: "North Western Province  " },
  { value: "North Central Province" },
  { value: "Uva Province" },
  { value: "Sabaragamuwa Province" },
];

const CCForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      Address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      provinces: {
        value: "",
        isValid: false,
      },
      postal_code: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/credit/new", {
        id: 1,
        firstname: formState.inputs.firstname.value,
        lastname: formState.inputs.lastname.value,
        cvv: formState.inputs.cvv.value,
        category: formState.inputs.category.value,
        expiredate: formState.inputs.expiredate.value,
        number: formState.inputs.number.value,
      })
      .then((res) => {
        setLoading(false);
        navigate("/Credit/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">
                  Add Product
                </h2>
                <p class="text-gray-500 mb-6 text-center">
                  Enter Product details below !!
                </p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="fname"
                            type="text"
                            placeholder="Enter First Name"
                            label="First Name :"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="lname"
                            type="text"
                            placeholder="Enter Last Name"
                            label="Last Name :"
                            validators={[VALIDATOR_REQUIRE(),VALIDATOR_MAXLENGTH(16)]}
                            errorText="Please Enter a Name."
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="number"
                            type="text"
                            placeholder="Enter Card Number"
                            label="Card Number :"
                            validators={[
                              VALIDATOR_MIN(16),
                              VALIDATOR_MAX(16),
                            ]}
                            errorText="Please enter correct card number"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="cvv"
                            type="number"
                            placeholder="Enter CVV"
                            label="CVV :"
                            validators={[
                              VALIDATOR_MIN(3),
                              VALIDATOR_MAX(4),
                            ]}
                            errorText="Please Enter your cvv"
                            onInput={inputHandler}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Dropdown
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            id="category"
                            options={Category}
                            onInput={inputHandler}
                            Display=""
                            label="Category:"
                          />
                        </div>
                        <div class="md:col-span-2">
                          <Input
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            element="Input"
                            id="expdate"
                            type="date"
                            placeholder="Enter Expiry Date"
                            label="Expiry Date :"
                            validators={[VALIDATOR_REQUIRE(),VALIDATOR_DATE()]}
                            errorText="Please Enter a Expiry date."
                            onInput={inputHandler}
                          />
                        </div>

                        <div class="md:col-span-5 text-right">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default CCForm;
export { Category };