import React from "react";
import { PaymentPage } from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/user";

const username = async ({ params }) => {
  //if the username is not present in the database, show 404 page

  const checkUser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: params.username });
    if (!u) {
      return notFound();
    }
  };
  await checkUser();

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}
