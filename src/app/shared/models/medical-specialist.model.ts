export class MedicalSpecialistModel{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    organisation: string;
    location: string;
    telephone: string;
    email: string;
    otherContact: string;
    description: string;
    isAvailable: boolean;
    specialisations: Specialisation[];
}
export class Specialisation{
    id: number;
    name: string;
}