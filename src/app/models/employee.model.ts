export interface Employee {
    id: number;
    name: string;
    role: string;
    department: 'Engineering' | 'Design' | 'Product' | 'Sales';
    avatarUrl: string;
    isActive: boolean;
}
