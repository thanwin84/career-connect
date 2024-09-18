import { useState } from "react";

export default function useFilePreview(initialFileUrl = null){
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(initialFileUrl)

    function handleFileChange(e){
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setFileUrl(url)
        setFile(file)
    }
    return {
        file,
        fileUrl,
        handleFileChange
    }
}