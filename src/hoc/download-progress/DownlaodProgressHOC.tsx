import React from "react";
import "./download-progress.css";
import useFetchDownloadProgress from "../../hooks/useFetchDownloadProgress";
import useAxiosDownloadProgress from "../../hooks/useAxiosDownloadProgress";



const hooksObject: ThooksObject = {
  useFetchDownloadProgress,
  useAxiosDownloadProgress,
};


const DownloadProgressHOC: React.FC<DownloadProgressHOCProps> = ({ Component, hookName }) => {
  const {
    progress,
    isModalOpen,
    triggerDownloadProgress,
    closeModal,
  }: TDownloadProgressHook = hooksObject[hookName]();

  return (
    <>
      <ModalComponent
        progress={progress}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <Component triggerDownloadProgress={triggerDownloadProgress} progress={0} isModalOpen={false} closeModal={function (): void {
        throw new Error("Function not implemented.");
      }} />
    </>
  );
};

const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const { closeModal, isModalOpen, progress } = props;

  if (!isModalOpen) return null;

  return (
    <div className="dwn-modal">
      <div className="dwn-modal-content">
        <div className="close" onClick={closeModal}>
          &times;
        </div>
        <h3>Downloading...</h3>
        <progress value={progress} max={100} />
        <span>{progress}% Complete</span>
      </div>
    </div>
  );
};

export default DownloadProgressHOC;
