export interface User {
    id?: string;
    email: string;
    name: string;
    photo?: string;
    gender: "MALE" | "FEMALE" | "OTHERS";
    dob: string;
    state: string;
    city: string;
    college: string;
    idCard: string;
    mobile: string;
    festID: string;
    rollNumber: string;
    firebaseId: string;
    hasPaid?: boolean;
    receipt?: string;
    transactionID?: string;
    hall?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
