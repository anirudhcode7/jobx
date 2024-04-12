import React, { useState, useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { fetchJobs, addJob, updateJob, deleteJob } from "../../api/jobApi";
import JobPostMain from "./JobPostMain";
import AddJobModal from "./AddJobModal";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export default function JobsMain() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authToken } = useAuth(); // Get the authToken from the AuthContext
  const { userInfo } = useAuth();
  console.log("userInfo: ", userInfo);

  useEffect(() => {
    // Fetch jobs from the backend when the component mounts
    fetchJobsFromApi();
  }, [authToken]);

  useEffect(() => {
    if (jobData) {
      onOpen();
    }
  }, [jobData, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      setJobData(null);
    }
  }, [isOpen]);

  const fetchJobsFromApi = async () => {
    try {
      const data = await fetchJobs(authToken); // Pass authToken to fetchJobs function
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleAddJob = async (newJobData) => {
    try {
      await addJob(authToken, newJobData); // Pass authToken to addJob function
      fetchJobsFromApi();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleUpdateJob = async (updatedJobData) => {
    try {
      await updateJob(authToken, jobData._id.toString(), updatedJobData); // Pass authToken to updateJob function
      fetchJobsFromApi();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Editing job with id:", id);
    const job = jobs.find((job) => job._id.toString() === id);
    setJobData(job);
    onOpen();
  };

  const handleDelete = async (id) => {
    console.log("Deleting job with id:", id);
    try {
      await deleteJob(authToken, id); // Pass authToken to deleteJob function
      fetchJobsFromApi();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold text-black mb-4">All Jobs</h1>
        <div className="flex items-center justify-between mb-4">
          {userInfo?.role === "admin" && (
            <Button
              onPress={onOpen}
              className="text-white bg-indigo-800"
              size="lg"
              radius="full"
              variant="bordered"
            >
              Add Job
            </Button>
          )}
          <input
            type="text"
            placeholder="Search"
            className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72" // Increase the width of the search bar by adding 'w-72' class
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs
            .slice(0)
            .reverse()
            .map((job, index) => (
              <JobPostMain
                key={index}
                id={job._id.toString()}
                title={job.title}
                jobLink={job.job_link}
                companyLogoUrl={job.company_logo}
                company={job.company_name}
                description={job.description}
                location={job.location}
                employmentType={job.employment_type}
                yearsOfExperience={job.experience_required}
                skills={job.skills_required}
                handleDelete={userInfo?.role === "admin" ? handleDelete : null}
                handleEdit={userInfo?.role === "admin" ? handleEdit : null}
              />
            ))
        )}

        <AddJobModal
          isOpen={isOpen}
          onClose={onClose}
          onAddJob={handleAddJob}
          initialJobData={jobData}
          onUpdateJob={handleUpdateJob}
        />
      </div>
    </>
  );
}
