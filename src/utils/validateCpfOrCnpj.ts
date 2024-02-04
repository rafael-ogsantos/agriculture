export function validateCpfOrCnpj(cpfOrCnpj: string): boolean {
    return cpfOrCnpj.length === 11 || cpfOrCnpj.length === 14;
}