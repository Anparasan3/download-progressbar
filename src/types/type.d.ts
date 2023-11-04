type TfileDownloadAPI = {
  apiUrl: string;
  saveFileName: string;
};

type TDownloadProgressHook = {
  progress: number;
  isModalOpen: boolean;
  triggerDownloadProgress: (data: TfileDownloadAPI) => void;
  closeModal: () => void;
};

type ThooksObject = {
  useFetchDownloadProgress: () => TDownloadProgressHook;
  useAxiosDownloadProgress: () => TDownloadProgressHook;
};


/**
 * Props types
 */
type DownloadProgressHOCProps = {
  Component: ComponentType<TDownloadProgressHook>;
  hookName: "useFetchDownloadProgress" | "useAxiosDownloadProgress";
};

interface ModalComponentProps {
  closeModal: () => void;
  progress: number;
  isModalOpen: boolean;
}
