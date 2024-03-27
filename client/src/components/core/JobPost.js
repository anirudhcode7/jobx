import { Button } from "@nextui-org/react";
import { Locate, Luggage, Crown } from "lucide-react";

const SkillTag = ({ skill }) => {
    return (
      <div className="inline-block rounded-full bg-gray-200 px-4 py-2 mr-2 hover:bg-gray-300 cursor-pointer">
        <span className="text-gray-500">{skill}</span>
      </div>
    );
  }

export default function JobPost() {
  return (
    <>
      <div className="relative bg-gray-100 shadow-md rounded-3xl p-6 m-5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr] items-start">
            <div className="flex items-center space-x-4">
              <img
                alt="Company logo"
                className="rounded-lg object-cover aspect-square border"
                height="80"
                src="/placeholder.svg"
                width="80"
              />
              <div className="space-y-2.5">
                <h3 className="text-2xl text-black font-bold tracking-tighter">
                  Senior Frontend Engineer
                </h3>
                <p className="text-gray-500">Acme Corporation</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-0.5 items-start">
                <h4 className="text-xl text-black font-semibold tracking-tighter">
                  Description
                </h4>
                <p className="text-gray-500 leading-7">
                  We're looking for a Senior Frontend Engineer to join our team.
                  You'll be responsible for architecting and building the user
                  interface for our next-generation web applications.
                </p>
              </div>
              <div className="flex items-center justify-evenly">
                <div className="flex items-center">
                  <Locate className="w-4 h-4 mr-1 text-black" />
                  <span className="text-gray-500">San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <Luggage className="w-4 h-4 mr-1 text-black" />
                  <span className="text-gray-500">Full-time</span>
                </div>
                <div className="flex items-center">
                  <Crown className="w-4 h-4 mr-1 text-black" />
                  <span className="text-gray-500">2 Years Exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 md:px-6">
          <div className="container px-4 md:px-6">
            <div className="flex items-center space-x-4">
              <div className="space-y-4 flex-1">
                <h4 className="text-lg text-black font-semibold tracking-tight">
                  Top Skills
                </h4>
                <SkillTag skill="React" />
                <SkillTag skill="Node.js" />
                <SkillTag skill="Vue" />
              </div>
              <Button className="ml-auto mt-10 text-white bg-indigo-800" size="lg" radius="full" variant="bordered">
                Apply Now
              </Button>
              <Button className="ml-auto mt-10 text-white bg-indigo-800" size="lg" radius="full" variant="bordered">
                Start Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
