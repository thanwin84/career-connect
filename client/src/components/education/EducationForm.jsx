import React, {useState} from "react";
import {
    Input,
    Checkbox,
    SubmitForm
} from "../../components"
import {DateSelector} from './'
import { useProfileContext } from "../../pages/Profile";
import { CrossIcon } from "../../utils/Icons";


export default function EducationForm({
    title, 
    action, 
    record, 
    handleEditModal}){
    const {toggleAddEducationModal} = useProfileContext()
    const [currentlyStudying, setCurrentlyStudying] = useState(false || record?.currentlyStudying)
    const [formObject, setFormObject] = useState({
        school: "" || record?.school,
        degree: "" || record?.degree,
        department: "" || record?.department,
        startMonth: "June" || record?.startMonth,
        startYear: "2022" || record?.startYear,
        endYear: "2022" || record?.endYear,
        endMonth: "June" || record?.endMonth
    })
    const editForm = title.substring(0, 1)=== 'E'
    const btnText = {
        add: {pending:"In progress.. ", default: "Save"},
        update: {pending: "Updating...", default: "Update"}
    }
    
    return (
        <section className="bg-white dark:bg-zinc-900 px-6 py-6 rounded-lg">
           <div className="flex justify-between">
            <h2 className="text-xl mb-2 dark:text-slate-200">{title}</h2>
            <button
                onClick={ editForm ? handleEditModal : toggleAddEducationModal}
                className="text-xl dark:text-slate-100 font-bold hover:text-red-600 dark:hover:text-red-600 hover:text-2xl"
            >
                <CrossIcon />
            </button>
           </div>
           <form action={action} className="flex flex-col gap-2 p-4">
                <Input 
                    label="School/College"
                    name="school"
                    placeholder="Which school/College have you studied at?"
                    defaultValue = {formObject.school}
                />
                <Input 
                    label="Degree"
                    name="degree"
                    placeholder= "ex:B.E"
                    defaultValue = {formObject.degree}
                />
                <Input 
                    label="Department"
                    name="department"
                    placeholder= "ex:Computer Science and Engineering"
                    defaultValue = {formObject.department}
                />
                <DateSelector
                    title ="Starting From"
                    monthName="startMonth"
                    yearName= "startYear"
                    defaultMonth= {formObject.startMonth}
                    defaultYear= {formObject.startYear}
                />
                
                <Checkbox 
                    label="Currently studying" 
                    name="currentlyStudying"
                    checked = {currentlyStudying}
                    onChange={e => setCurrentlyStudying(e.target.checked)}
                    />
                    
                {
                    !currentlyStudying && (
                        <DateSelector
                            title ="Ending in"
                            monthName="endMonth"
                            yearName= "endYear"
                            defaultMonth= {formObject.endMonth}
                            defaultYear= {formObject.endYear}
                        />
                    )
                }
                <div className="flex justify-end">
                <SubmitForm 
                    buttonText={editForm ? btnText.update : btnText.add}
                    className="mt-4"
                    category="success"
                />
                </div>

           </form>
        </section>
    )
}