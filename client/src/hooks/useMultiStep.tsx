import  {ReactNode, useState} from "react";

export default function useMultiStep(steps: ReactNode[]){
    const [currentStep, setCurrentStep] = useState(0)

    function next(){
        setCurrentStep(prev => {
            if (prev >= steps.length - 1) return prev
            return prev + 1
        })
    }

    function back(){
        setCurrentStep(prev =>{
            if (prev <= 0) return prev
            return prev - 1
        })
    }
    function goTo(index:number){
        setCurrentStep(index)
    }
    function reset(){
        setCurrentStep(0)
    }

    return {
        currentStep,
        step: steps[currentStep],
        steps,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
        goTo,
        next,
        back,
        reset
    }
}