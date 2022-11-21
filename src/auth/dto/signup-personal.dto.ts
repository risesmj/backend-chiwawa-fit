import { GenderChoices } from "../enum/gender-choices";
import { SignUpProfile } from "./signup-profile";

export class SignUpPersonalDto implements SignUpProfile {
    public name: string;
    public gender: GenderChoices;
    public city: string;
    public state: string;
    public phone: string;
    public birth_date: string;

}