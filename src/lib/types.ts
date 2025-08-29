import { ResumeValue } from "./validation";

export interface EditorFormPorps {
  resumeData: ResumeValue;
  setResumeData: (data: ResumeValue) => void;
}
