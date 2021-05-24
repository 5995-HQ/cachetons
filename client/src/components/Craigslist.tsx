import React, { useCallback, useState } from "react";
import API from "../scripts/Api";

const CAN_READ = "CAN_READ";
const CANT_READ = "CANT_READ";
const LOADING = "LOADING";
const NOT_LOADED = "NOT_LOADED";
type componentNameStatus =
    | typeof CAN_READ
    | typeof CANT_READ
    | typeof LOADING
    | typeof NOT_LOADED;
const Craigslist = () => {
    const [components, setComponents] = useState<string[]>([])
    const [componentName, setcomponentName] = React.useState("");
    const [componentVersion, setcomponentVersion] = React.useState("");
    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            setcomponentNameStatus(LOADING);
            event.preventDefault();
            API.get(`/verify-bundle?name=${componentName}&version=${componentVersion}`).then((data: any) => {
                if (data.data.status === true) {
                    setcomponentNameStatus(CAN_READ)
                    setComponents(data.data.message);
                } else {
                    setcomponentNameStatus(CANT_READ)
                    setComponents(data.data.message);;
                }
            });
        },
        [componentName, componentVersion]
    );
    const [componentNameStatus, setcomponentNameStatus] = useState<
        componentNameStatus
    >(NOT_LOADED);

    return (
        <div>
            <div
                className="mt-4 bg-indigo-lightest border-t-4
              border-indigo rounded-b text-teal-darkest px-4 py-3 shadow-sm"
            >
                <div className="flex">
                    <div className="py-1">
                        <svg
                            className="fill-current h-6 w-6 text-indigo mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34
                                  4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-bold text-base">
                            Can Jira Robot read my Component?
            </h2>
                        <p className="text-sm">
                            Enter your <u>Component</u> name and <u>Version</u> to verify if Jira Robot can <u>read</u> and <u>write</u> to it.
            </p>
                    </div>
                </div>
            </div>
            <br></br>
            <div>
                <div>
                    <form onSubmit={handleSubmit} className="mt-4 mt-1 p-1 mr-2 text-sm">
                        <div className="flex">
                            <label htmlFor="component name" className="component mt-1 p-1 mr-2 text-sm">Component Name</label>
                            <div>
                                <input
                                    required
                                    placeholder="RTW Jira"
                                    className="border border-grey-light mt-1 p-1 mr-2 text-sm text-black rounded-sm w-half bg-white"
                                    value={componentName}
                                    onChange={(event) => {
                                        setcomponentName(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex">
                                <label htmlFor="version" className="version mt-1 p-1 mr-2 text-sm">Version</label>
                                <input
                                    required
                                    placeholder="All"
                                    className="border border-grey-light mt-1 p-1 mr-2 text-sm text-black rounded-sm w-half bg-white"
                                    value={componentVersion}
                                    onChange={(event) => {
                                        setcomponentVersion(event.target.value);
                                    }}
                                />
                            </div>
                            <br></br>
                            <button
                                type="submit"
                                className="bg-indigo px-2 mt-1 mr-1 rounded-sm text-white"
                            >
                                Verify
          </button>

                            <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                                <div className="w-full h-full bg-gray-200 absolute"></div>
                                <div
                                    id="bar"
                                    className="transition-all ease-out duration-1000 h-full bg-green-500 relative w-0"
                                ></div>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <div className="text-lg">
                    <br></br>
                    <div className="text-center subpixel-antialiased text-m text-black">
                        {componentNameStatus === CAN_READ && (
                            <p>
                                {components}
                                <br></br>{" "}
                                <br></br>
                                    What does this privilege level mean?
                            </p>
                        )}
                        {componentNameStatus === CANT_READ && (
                            <p>
                                {components}
                                <br></br>
                                <br></br>Check our{" "}
                            </p>
                        )}
                        {componentNameStatus === LOADING && "loading..."}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Craigslist;
