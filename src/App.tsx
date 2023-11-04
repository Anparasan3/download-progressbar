import { FC } from "react";
import "./App.css";
import DownloadProgressHOC from "./hoc/download-progress/DownlaodProgressHOC";

const fileDownloadAPI: TfileDownloadAPI = {
  apiUrl: "https://fastly.picsum.photos/id/343/400/400.jpg?hmac=OAMnrxMqp1LKMAqQJBWij5j5fqLf5RKwOgCEJvmv00Y",
  saveFileName: "test.jpg"
}

const commonStyle = {
  backgroundColor: "#39AEBC",
  width: "50vw",
  height: "100vh",
  display: "grid",
  alignItems: "center"
}

const titleStyle = {
  paddin: "5px",
  fontSize: "bold",
}

const FetchComponent: FC<TDownloadProgressHook> = (props) => {
  const { triggerDownloadProgress } = props;

  return (
    <div style={{ ...commonStyle }}>
      <div>
        <h2 style={titleStyle}>Fetch page</h2>
        <button
          onClick={() => {
            triggerDownloadProgress(fileDownloadAPI);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

const AxiosComponent: FC<TDownloadProgressHook> = (props) => {
  const { triggerDownloadProgress } = props;

  return (
    <div style={{ ...commonStyle, backgroundColor: "#B5E5DC" }}>
      <div>
        <h2 style={titleStyle}>Axios Fetch page</h2>
        <button
          onClick={() => {
            triggerDownloadProgress(fileDownloadAPI);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

const HOCUsedFetchComponent = () => (
  <DownloadProgressHOC Component={FetchComponent} hookName="useFetchDownloadProgress" />
);
const HOCUsedAxiosComponent = () => (
  <DownloadProgressHOC Component={AxiosComponent} hookName="useAxiosDownloadProgress" />
);

function App() {
  return (
    <main style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <HOCUsedFetchComponent />
      <HOCUsedAxiosComponent />
    </main>
  );
}

export default App;
