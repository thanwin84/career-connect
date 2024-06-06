import React from "react";
import day from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import JobInfo from "./JobInfor";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from "react-router-dom";
import Button from "./Button";

export default function Job({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus
}){
    const styles = {
        interview: "bg-green-100 text-green-500",
        pending: "bg-orange-100 text-orange-500",
        declined: "bg-red-100 text-red-500"
    }
    const date = day(createdAt).format('MMM Do, YYYY')
    return (
        <section className="p-4 rounded-md mb-2 shadow-md bg-white">
           <header className="flex border-b border-b-slate-200 p-4">
            <div className="mr-4 bg-blue-700 text-white p-4 rounded-md">{company.substring(0, 1)}</div>
            <div className="">
                <h4 className="text-xl">{position}</h4>
                <h4 className="text-slate-600">{company}</h4>
            </div>
           </header>
           <div className="p-4 grid grid-cols-2 gap-y-2"> 
                <JobInfo icon={<FaLocationArrow className="text-blue-600"/>} text={jobLocation} />
                <JobInfo icon={<FaCalendarAlt className="text-blue-600"/>} text={date} />
                <JobInfo icon={<FaBriefcase className="text-blue-600"/>} text={jobType} />
                <div className="">
                    <span className={`px-4 py-1  rounded-sm ${styles[jobStatus]}`}>{jobStatus}</span>
                </div>
           </div>
           <div className="flex gap-2 px-4">
            <Link
                to={`../edit-job/${_id}`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >Edit
            </Link>
            <Form method="post" action={`../delete-job/${_id}`}>
                <Button 
                    type="submit"
                    category="danger"
                >
                    Delete
                </Button>
            </Form>
           </div>
        </section>
    )
}