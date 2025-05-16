import * as React from "react";
import axios from "axios";
import { serverUrl } from "../helpers/constants";

interface IFormContainerProps {
    updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const { updateReloadState } = props;
    const [fullUrl, setFullUrl] = React.useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (fullUrl) {
                await axios.post(`${serverUrl}/shorturl`, {
                    fullUrl: fullUrl,
                });
                setFullUrl("");
                updateReloadState();
            } else {
                setFullUrl("");
                alert("Already exits Url");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mx-auto p-2">
            <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
                <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
                    <h2 className="text-white text-4xl text-center pb-4">
                        <p className="text-white text-center pb-2 text-xl font-extralight">
                            paste your untidy link to shorten it
                        </p>
                        <p className="text-white text-center pb-4 text-sm font-thin">
                            free tool to shorten a URL or reduce link, Use our URL shortner to create a shortened & neat{" "}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 text-sm flex items-center ps-2 pointer-events-none text-slate-800 ">
                                        Urlshortner.link/
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="add your link"
                                        required
                                        className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus-blue-500"
                                        value={fullUrl}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFullUrl(e.target.value)
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded border border-blue-700 focus:ring-4 focus:outline-none focus:ring"
                                    >
                                        Shorten URL
                                    </button>
                                </div>
                            </div>
                        </form>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
