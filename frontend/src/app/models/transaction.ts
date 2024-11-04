export interface Transaction {
    id: string;
    type: string;
    description: string;
    amount: number;
    category_id: string;
    created_at: Date; // Adicionada para resolver o erro
}