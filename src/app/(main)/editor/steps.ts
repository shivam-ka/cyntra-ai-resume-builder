import { EditorFormPorps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PerfonalInfoForm";

export const steps: {
  title: string;
  components: React.ComponentType<EditorFormPorps>;
  key: string;
}[] = [
  {
    title: "General Info",
    components: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personam Info",
    components: PersonalInfoForm,
    key: "personal-info",
  },
];
