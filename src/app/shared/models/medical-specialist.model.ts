export class MedicalSpecialistModel{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    organisation: string;
    location: string;
    telephon: string;
    email: string;
    otherContact: string;
    description: string;
    isAvailable: boolean;
    specialisations: SpecialisationModel[];
}
export class SpecialisationModel{
    id: number;
    name: string;
    active: boolean;
}