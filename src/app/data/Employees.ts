import { Employee } from '../models/employee.model';
export const ListEmployees: Employee[] = [
    {
        id: 1,
        name: 'Mark',
        gender: 'Male',
        contactPreference: 'Email',
        email: 'mark@gmail.com',
        dateOfBirth: new Date('10/25/1988'),
        department: 'IT',
        isActive: true,
        photoPath: 'assets/images/mark.png'
    },
    {
        id: 2,
        name: 'Mary',
        gender: 'Female',
        contactPreference: 'Phone',
        email: 'mary@gmail.com',
        phoneNumber: 9865875820,
        dateOfBirth: new Date('11/20/1986'),
        department: 'HR',
        isActive: true,
        photoPath: 'assets/images/mary.png'
    },
    {
        id: 3,
        name: 'John',
        gender: 'Male',
        contactPreference: 'Phone',
        phoneNumber: 7865808188,
        dateOfBirth: new Date('03/12/1981'),
        department: 'IT',
        isActive: false,
        photoPath: 'assets/images/john.png'
    }
];
