import {
    Input,
    Checkbox,
    Button
} from "../ui"
import {DateSelector} from './'
import { CrossIcon } from "../../utils/Icons";
import {FormProvider, useForm} from 'react-hook-form'
import { Education, FormData } from "../../types";


type Props = {
    title: string
    onSave: (formData: FormData)=> void
    record: Education
    isPending: boolean
    closeModal: ()=> void
    submitButtonText: string
    id?: string
}

export default function EducationForm({
    title, 
    onSave,
    record,
    isPending,
    closeModal,
    submitButtonText,
    id="id"
}:Props){ 
    const methods = useForm(
        {
            defaultValues: record
        }
    )
    const {
        handleSubmit,
        register,
        formState,
        watch
    } = methods
    const {errors} = formState
    
    
    const isChecked = watch('currentlyStudying')

    
    
    return (
        <section className="bg-white dark:bg-zinc-900 px-6 py-6 rounded-lg">
           <div className="flex justify-between">
            <h2 id={id} className="text-xl mb-2 dark:text-slate-200">{title}</h2>
            <button
                onClick={closeModal}
                className="text-xl dark:text-slate-100 font-bold hover:text-red-600 dark:hover:text-red-600 hover:text-2xl"
            >
                <CrossIcon />
            </button>
           </div>
           <FormProvider {...methods}>
            <form  onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3 p-4">
                <Input 
                    label="School/College"
                    placeholder="Which school/College have you studied at?"
                    {...register('school', {required: "school is required"})}
                    errorMessage={errors?.school?.message}
                />
                <Input 
                    label="Degree"
                    placeholder= "ex:B.E"
                    {...register('degree', {required: "Please select degree"})}
                    errorMessage={errors?.degree?.message}
                />
                <Input 
                    label="Department"
                    placeholder= "ex:Computer Science and Engineering"
                    {...register('department', {required: "Please select your department"})}
                    errorMessage={errors?.department?.message}
                />
                <DateSelector
                    title ="Starting From"
                    monthName="startMonth"
                    yearName= "startYear"
                />
                
                <Checkbox 
                    label="Currently studying" 
                    {...register('currentlyStudying')}
                    // checked = {currentlyStudying}
                />
                    
                {
                    !isChecked && (
                        <DateSelector
                            title ="Ending in"
                            monthName="endMonth"
                            yearName= "endYear"
                        />
                    )
                }
                <Button
                    loading={isPending}
                    type="submit"
                    classname="self-end mt-2"
                    aria-label={submitButtonText}
                >
                    {submitButtonText}
                </Button>
            </form>
           </FormProvider>
        </section>
    )
}