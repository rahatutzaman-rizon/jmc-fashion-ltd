"use client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import SubmitButton from "./SubmitButton/SubmitButton";
import img from "../../assets/img1.jpeg";

const List = () => {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState([
    {
      name: "VISA",
      type: "visa",
      logo: {img},
      gw: "visacard",
      r_flag: "1",
      redirectGatewayURL: "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtmlOTP.php?mamount=1000.00&ssl_id=2310191520231MLVg8ZTsa9Ld4k&Q=REDIRECT&SESSIONKEY=9CE83C4562A96645C7652AF10D220C37&tran_type=success&cardname=visavard",
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PaymentOption = async () => {
    try {
      setLoader(true);
      const res = await fetch("/api/payment", { method: "POST" });
      if (!res.ok) throw new Error("Network response was not ok");
      const JSON = await res.json();
      setMethod(JSON.data.desc);
      setShow(true);
    } catch (error) {
      console.error("Error fetching payment options:", error);
    } finally {
      setLoader(false);
    }
  };

  const PayNow = (PayURL) => {
    window.location.replace(PayURL);
  };

  return (
    <div>
      <section className="h-full bg-gray-100">
        <div className="container mx-auto py-10">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h5 className="text-xl font-semibold">Shopping Cart</h5>
                    <a href="#!" className="text-blue-600">
                      Continue Shopping
                    </a>
                  </div>
                  <hr className="mb-6" />

                  {/* Shopping Cart Items */}
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <Image
                          src={img}
                          width={80}
                          height={80}
                          className="rounded-lg"
                          alt="Shopping item"
                        />
                        <div className="ml-4">
                          <h5 className="text-lg font-medium">Item {index + 1}</h5>
                          <p className="text-gray-600 text-sm">Description {index + 1}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-8 text-lg font-medium">2</div>
                        <div className="text-lg font-medium">$900</div>
                        <button className="ml-4 text-gray-400 hover:text-red-600">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-100">
                  <h5 className="text-lg font-semibold mb-4">Shipping Details</h5>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="block text-gray-600 mb-1">Shipping Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Shipping City</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Shipping Phone No</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Shipping Address</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                    <hr className="my-6" />
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>$4798.00</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <p>$20.00</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <p>Total</p>
                      <p>$4818.00</p>
                    </div>
                    <SubmitButton
                      onClick={PaymentOption}
                      submit={loader}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
                      text="Checkout"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <h6>Pay Now</h6>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className="container">
            <div className="grid grid-cols-3 gap-4">
              {method.map((item, i) => (
                <div key={i} className="col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-2 cursor-pointer" onClick={() => PayNow(item.redirectGatewayURL)}>
                    <Image src={item.logo} alt={item.name} width={100} height={100} className="w-full h-16 object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default List;
