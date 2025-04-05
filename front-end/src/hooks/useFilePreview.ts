import { ChangeEvent, useState } from 'react';

export default function useFilePreview(initialFileUrl: string | null = null) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    let url;
    if (file) {
      url = URL.createObjectURL(file);
      setFileUrl(url);
      setFile(file);
    }
  }
  return {
    file,
    fileUrl,
    handleFileChange,
  };
}
