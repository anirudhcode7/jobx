import { useState, useEffect } from "react";
import axios from "axios";
import JobPostMain from "./JobPostMain";
import {
  Button,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import StringList from "./StringListInput";

const API_URL = "http://localhost:3004/api/";

// Edit Configurations Main Area
export function ConfigurationsMain() {
  const [chatGPTEnabled, setChatGPTEnabled] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-black mb-4">Configurations</h1>
      <Switch
        checked={chatGPTEnabled}
        onChange={(val) => setChatGPTEnabled(val)}
        size="small"
        className="mb-4"
      >
        ChatGPT Evaluation
      </Switch>
      {/* Add more configuration options here */}
    </div>
  );
}

export function JobsMain() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newJobData, setNewJobData] = useState({
    title: "",
    description: "",
    job_link: "",
    employment_type: "",
    location: "",
    skills_required: [],
    experience_required: 0,
    company_name: "",
    company_logo: "",
  });

  useEffect(() => {
    // Fetch jobs from the backend when the component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(API_URL + "/jobs");
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleAddJob = async () => {
    try {
      // Send POST request to add the job
      await axios.post(API_URL + "/jobs", newJobData);

      // Refetch jobs to update the job list
      fetchJobs();
      onClose();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSkillList = (newList) => {
    setNewJobData((prevObject) => ({
      ...prevObject,
      skills_required: newList,
    }));
  };

  const handleRadioChange = (value) => {
    setNewJobData((prevData) => ({
      ...prevData,
      employment_type: value,
    }));
  };

  const handleDelete = async (id) => {
    console.log("Deleting job with id:", id);
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      // Implement any additional logic here, if needed
      fetchJobs(); // Example: Refresh the job list
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error; // Rethrow the error to handle it elsewhere, if needed
    }
  };

  return (
    <>
      {/* Render Add Job button */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-black mb-4">All Jobs</h1>
        <Button
          onPress={onOpen}
          className="ml-auto text-white bg-indigo-800"
          size="lg"
          radius="full"
          variant="bordered"
        >
          Add Job
        </Button>

        {/* Render modal for adding a job */}
        <Modal
          hideCloseButton
          isOpen={isOpen}
          onClose={onClose}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[calc(100vh-40px)] overflow-y-auto"
        >
          <ModalContent>
            <ModalHeader>
              <h1 className="text-xl font-bold text-black mb-2">Add Job</h1>
            </ModalHeader>
            <ModalBody>
              {/* Add form fields for job details */}
              <Input
                label="Company Name"
                variant="flat"
                name="company_name"
                value={newJobData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
              />
              <Input
                label="Title"
                variant="flat"
                name="title"
                value={newJobData.title}
                onChange={handleChange}
                placeholder="Job Title"
              />
              <Textarea
                label="Description"
                variant="flat"
                name="description"
                value={newJobData.description}
                onChange={handleChange}
                placeholder="Job Description"
              />
              <Input
                label="Job Link"
                variant="flat"
                name="job_link"
                value={newJobData.job_link}
                onChange={handleChange}
                placeholder="Job Link"
              />
              <Input
                label="Years of Experience Required"
                variant="flat"
                name="experience_required"
                value={newJobData.experience_required}
                onChange={handleChange}
                placeholder="Years of Experience Required"
              />
              <Input
                label="Location"
                variant="flat"
                name="location"
                value={newJobData.location}
                onChange={handleChange}
                placeholder="Remote/On-site"
              />
              <Input
                label="Company Logo Url"
                variant="flat"
                name="company_logo"
                value={newJobData.company_logo}
                onChange={handleChange}
                placeholder="Company Logo Url"
              />
              <StringList
                stringList={newJobData.skills_required}
                setStringList={handleAddSkillList}
                placeholder="Skills required"
                label="Skills required"
              />
              <RadioGroup
                style={{ marginLeft: "10px" }}
                label={
                  <span style={{ fontSize: "12px" }}>Employment Type</span>
                }
                value={newJobData.employment_type}
                onValueChange={handleRadioChange}
                orientation="horizontal"
              >
                <Radio value="full-time">Full-time</Radio>
                <Radio value="part-time">Part-time</Radio>
                <Radio value="intern">Intern</Radio>
              </RadioGroup>
              {/* Add more input fields for other job details */}
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleAddJob}>Add Job</Button>
              <Button ghost onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Render each job post */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job, index) => (
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
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}

export function InterviewQuestionsMain() {
  // Add state and functions for managing interview questions

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-black mb-4">Interview Questions</h1>
      {/* Add form or component for adding/editing interview questions */}
    </div>
  );
}
