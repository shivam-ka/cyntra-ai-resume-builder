import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design Your Custom Resume",
};
export default function Page(){
    return (
        <main>
            <ResumeEditor />
        </main>
    )
}