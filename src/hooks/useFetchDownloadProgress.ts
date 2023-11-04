import { useCallback, useState } from "react";

function useFetchDownloadProgress() {
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setModal] = useState<boolean>(false);

  async function triggerDownloadProgress(details: TfileDownloadAPI) {
    console.log("Downloading...");

    const { apiUrl, saveFileName } = details;
    setModal(true);

    if (!apiUrl || !saveFileName) {
      console.error(
        `Missing required details. URL: ${apiUrl}, saveFileName: ${saveFileName}`
      );
      return;
    }

    const response = await fetch(apiUrl);
    console.log(response);

    if (!response?.body) return;

    const contentLength: string | null = response.headers.get("Content-Length");
    const totalLength = contentLength ? parseInt(contentLength, 10) : 0;
    console.log("Content length: " + totalLength);

    const reader = response.body.getReader();
    const chunks = [];
    let receivedLength = 0;

    const condition = true;
    while (condition) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Done");
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
      const step: string = ((receivedLength / totalLength) * 100).toFixed(2);
      setProgress(parseFloat(step));
    }

    const blob = new Blob(chunks);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = saveFileName;

    function handleOnDownload() {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", handleOnDownload);
        setModal(false);
        setProgress(0);
        // alert("Downloaded successfully!");
      }, 150);
    }

    a.addEventListener("click", handleOnDownload, false);

    a.click();
  }

  const closeModal = useCallback(() => setModal(false), []);

  return {
    progress,
    isModalOpen,
    triggerDownloadProgress,
    closeModal,
  } as TDownloadProgressHook;
}

export default useFetchDownloadProgress;
