import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center h-[44vh] px-5 md:px-0 text-xs md:text-base text-white">
        <div className=" flex gap-2 justify-center items-center font-bold md:text-5xl text-3xl">
          Get Me a Chai{" "}
          <span>
            <img className="invertimg md:w-28 w-12 "  src="./tea.gif" alt="" />
          </span>
        </div>

        <p className="text-center md:text-left ">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <p className="text-center md:text-left ">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>
        <div className="">
        <Link href={"/login"} >
          <button
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Now!
          </button></Link> 
          <Link href={"/about"} >
          <button
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button></Link> 
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-24 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex gap-5 justify-around md:text-center">
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="man.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="w-2/3 md:text-lg text-xs">
              Your fans are available to support you 
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="coin.gif"
              alt=""
            />
            <p className="font-bold  text-center">Fans want to contribute </p>
            <p className="w-2/3  md:text-lg text-xs ">
             Your fans are willing to contribute financially
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="group.gif"
              alt=""
            />
            <p className="font-bold  text-center">Fans want to collaborate</p>
            <p className="w-2/3  md:text-lg text-xs ">
            Your Fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>


      <div className="bg-white h-1 opacity-10"></div>


      <div className="text-white container mx-auto pb-24 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn More About Us
        </h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] x;:w-[50%] xl:w-[50%] xl:h-[40vh] ">
        <iframe className="w-full h-full" src="https://www.youtube.com/embed/g2K86giNtxI?si=gZFyhfXUKySQkD6O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      </div>
    </>
  );
}
