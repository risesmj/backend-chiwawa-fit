import { GenderChoices } from "../enum/gender-choices";

export abstract class SignUpProfile {
    public name: string;
    public gender: GenderChoices;
    public city: string;
    public state: string;
    public phone: string;
    public birth_date: string;
}