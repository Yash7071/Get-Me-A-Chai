"use client";

import Script from "next/script";
// import payments from "@/models/payment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { notFound } from "next/navigation";

export const PaymentPage = ({ username }) => {
  // const { data: session } = useSession();

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchparams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchparams.get("paymentdone") == "true") {
      toast("Thanks for the support!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, [searchparams]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    //Get the order id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      // currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "GetMeAChai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Yash", //your customer's name
        email: "yashaggarwal108@gmail.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full bg-red-50  ">
        <img
          className="object-cover w-full h-[350px] "
          src={currentUser?.coverpic || "default-echoes-30.jpg"}
          alt=""
        />
        <div className="absolute md:bottom-[44%] md:right-[46.5%] bottom-[35%] right-[35%]  overflow-hidden rounded-lg border-4 border-blue-700 ">
          <img
            className="rounded-lg object-cover size-32"
            width={120}
            height={120}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center my-24 gap-2 mb-32 text-white">
        <div className="font-bold text-lg py-3 ">@{username}</div>
        <div className="text-slate-400">
          Lets help {username} to get a chai!
        </div>
        <div className=" text-slate-400 ">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row ">
          <div className=" supporters left-0 w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-5 ">
            <h2 className=" text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && <li>No Payments Yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 item-center">
                    <img className="md:w-10 md:h-10 w-8 h-8" src="avatar.gif" alt="user avatar" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message "{p.message}"
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makepayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-5 ">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <div className="">
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Your Name"
                />
              </div>

              <input
                onChange={handleChange}
                value={paymentform.message}
                type="text"
                name="message"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Your Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                type="text"
                name="amount"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
             <div className="md:flex md:justify-between ">
              <div className="mt-5">
                <button
                  onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                  type="button"
                  className="text-white p-3 md:w-20 w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-900"
                  disabled={
                    paymentform.name?.length < 3 ||
                    paymentform.message?.length < 4 ||
                    paymentform.amount?.length < 1
                  }
                >
                  Pay
                </button>
              </div>
              <div className="flex justify-between flex-col md:flex-row items-center ">
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => pay(1000)}
                    className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
                  >
                    Pay ₹10
                  </button>
                  <button
                    onClick={() => pay(2000)}
                    className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
                  >
                    Pay ₹20
                  </button>
                  <button
                    onClick={() => pay(3000)}
                    className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700"
                  >
                    Pay ₹30
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentPage;
