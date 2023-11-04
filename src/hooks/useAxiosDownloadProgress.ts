import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { downloadFile } from "../utils/file.helper";

const useAxiosDownloadProgress = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setModal] = useState<boolean>(false);

  const options: object = {
    responseType: "blob",

    onDownloadProgress: function (progressEvent: ProgressEvent) {
      const percentCompleted = Math.floor(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      console.log(percentCompleted);
      setProgress(percentCompleted);
    },
  };

  async function triggerDownloadProgress(details: TfileDownloadAPI) {
    console.log("Downloading...");

    const { apiUrl, saveFileName } = details;
    setModal(true);

    axios
      .get(apiUrl, options)
      .then((res: AxiosResponse<Blob>) => {
        // Do something with the result here
        console.log(res);
        downloadFile(res.data, saveFileName);
        setModal(false);
        setProgress(0);
        // alert("Downloaded successfully!");
      })
      .catch((err) => console.log(err));
  }

  const closeModal = useCallback(() => setModal(false), []);

  return {
    progress,
    isModalOpen,
    triggerDownloadProgress,
    closeModal,
  } as TDownloadProgressHook;
};

export default useAxiosDownloadProgress;
