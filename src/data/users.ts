export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  balance: number;
  kycStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  lastLogin: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@betplatform.com',
    username: 'demo_user',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-05-15',
    country: 'United States',
    balance: 5432.50,
    kycStatus: 'verified',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-20',
  },
  {
    id: '2',
    email: 'jane@example.com',
    username: 'jane_bet',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1 987 654 3210',
    dateOfBirth: '1985-08-22',
    country: 'United Kingdom',
    balance: 1250.00,
    kycStatus: 'pending',
    createdAt: '2024-03-20',
    lastLogin: '2024-12-19',
  },
  {
    id: '3',
    email: 'mike@example.com',
    username: 'mike_winner',
    firstName: 'Michael',
    lastName: 'Johnson',
    phone: '+1 555 123 4567',
    dateOfBirth: '1992-11-30',
    country: 'Canada',
    balance: 8900.75,
    kycStatus: 'verified',
    createdAt: '2024-02-10',
    lastLogin: '2024-12-18',
  },
];

export const currentUser = mockUsers[0];
