export type Producer = {
    id: number;
    cpfOrCnpj: string;
    name: string;
    farm: string;
    city: string;
    state: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    crops: Crops[];
};

export enum Crops {
    Soy = 'Soy',
    Corn = 'Corn',
    Rice = 'Cotton',
    Coffee = 'Coffee',
    Sugarcane = 'Sugarcane',
}

export type ProducerInput = Pick<Producer, 'cpfOrCnpj' | 'name' | 'farm' | 'city' | 'state' | 'totalArea' | 'arableArea' | 'vegetationArea' | 'crops'>;