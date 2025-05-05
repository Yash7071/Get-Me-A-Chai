import React from "react";

const about = () => {
  return (
    <div className="text-white p-12 m-11 w-full md:w-[60%] mx-auto flex flex-col gap-8 ">

    <div className="flex flex-col gap-4 ">
      <h1 className=" text-2xl font-bold ">
        About Get Me A Chai
      </h1>
      <p>
        Get Me a Chai is a platform built for creators, thinkers, doers, and
        anyone with a passion worth sharing. Whether you're a writer, developer,
        artist, podcaster, teacher, or anything in between, Get Me a Chai helps
        you connect directly with your audience—and get the support you deserve.
        Inspired by the warmth of a shared cup of chai, we make it easy for your
        fans and supporters to send you monetary contributions, big or small.
        Think of it as your own cozy digital café, where your work gets noticed,
        appreciated, and sustained.
      </p>
    </div>


    <div className="flex flex-col gap-4">
       <h1 className=" text-2xl font-bold ">
        Why We Built This
      </h1>
      <p>
        We know how hard it can be to turn creative passion into a sustainable
        income. That’s why we built Get Me a Chai—a simpler, friendlier
        alternative to complicated patron platforms. No fluff, no
        gatekeeping—just a clear and supportive way for you to grow your
        community and get rewarded for your work.
      </p>
      </div>

      <div className="flex flex-col gap-4">
       <h1 className=" text-2xl font-bold ">
        What you can do here 
      </h1>
     
      <ul>
        <li className=""> 💸 Accept one-time or monthly support from your fans</li>
        <li> 📝 Share updates, perks, or behind-the-scenes content</li>
        <li> 🎨 Build a page that reflects your style and mission</li>
        <li> 📊 Track your growth and earnings easily</li>
      </ul>
      </div>

      <div className="flex flex-col gap-4">
         <h1 className=" text-2xl font-bold ">
        For Supporters 
        </h1>
        <p>Supporting someone on Get Me a Chai isn’t just about money—it’s about showing appreciation. Every chai you send fuels someone's creativity, time, and dedication. It’s a small gesture that goes a long way.</p>
        </div>

    </div>
  );
};
export default about;


// either Static metadata
export const metadata = {
  title: 'About - Get Me A Chai',
}