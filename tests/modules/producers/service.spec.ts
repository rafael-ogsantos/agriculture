import ProducerRepository from '../../../src/modules/producers/interfaces/repository';
import { producerCreationMock, producerMock } from '../../../src/modules/producers/mocks/producer.mock';
import { Crops, ProducerInput } from '../../../src/modules/producers/schema';
import ProducersService from '../../../src/modules/producers/service';
import { AreaValidation } from '../../../src/modules/producers/validations/areaValidation';
import { CpfOrCnpjValidation } from '../../../src/modules/producers/validations/cpfOrCnpjValidation';
import { ValidateCropType } from '../../../src/modules/producers/validations/validateCropType';

describe('ProducersService', () => {
    let service: ProducersService;
    let mockRepository: Partial<ProducerRepository>;

    beforeEach(async() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByCpfOrCnpj: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const validations = [
            new CpfOrCnpjValidation(),
            new AreaValidation(),
            new ValidateCropType(),
        ];
        
        service = new ProducersService(mockRepository as ProducerRepository, validations);
    });

    it('should return all producers', async () => {
        (mockRepository.findAll as jest.Mock).mockResolvedValue([producerMock]);

        const producers = await service.findAll();

        expect(producers).toEqual([producerMock]);
    });

    it('should create a producer', async () => {
        const newProducer = { ...producerMock };
        (mockRepository.create as jest.Mock).mockResolvedValue(newProducer);

        const producer = await service.create(newProducer);

        expect(producer).toEqual(newProducer);
        expect(mockRepository.create).toHaveBeenCalledWith(newProducer);
    });

    it('should update a producer', async () => {
        const updatedProducer = { ...producerMock, name: 'Updated Name' };
        (mockRepository.update as jest.Mock).mockResolvedValue(updatedProducer);

        const producer = await service.update(1, updatedProducer);

        expect(producer).toEqual(updatedProducer);
        expect(mockRepository.update).toHaveBeenCalledWith(1, updatedProducer);
    });

    it('should delete a producer', async () => {
        (mockRepository.delete as jest.Mock).mockResolvedValue(true);

        const result = await service.delete(1);

        expect(result).toEqual(true);
        expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CPF or CNPJ is invalid', async () => {
        const invalidProducer = { ...producerMock, cpfOrCnpj: 'invalid' };
    
        await expect(service.create(invalidProducer)).rejects.toThrow('Invalid CPF or CNPJ');
    });

    it('should throw an error if the sum of agricultable area and vegetation is greater than the total farm area', async () => {
        const invalidProducer = { ...producerMock, arableArea: 400, vegetationArea: 900 };
    
        await expect(service.create(invalidProducer)).rejects.toThrow('The arable area and vegetation area cannot be greater than the total area');
    })


    it('should throw an error if the crop type is invalid', async () => {
        const invalidProducer: ProducerInput = { 
            cpfOrCnpj: '12345678901',
            name: 'Producer Name',
            farm: 'Farm Name',
            city: 'City',
            state: 'State',
            totalArea: 100,
            arableArea: 50,
            vegetationArea: 50,
            crops: ['invalidCrop' as Crops],
        };

        await expect(service.create(invalidProducer)).rejects.toThrow('Invalid crop type');
    });

    it('should not update a producer with the same cpf_or_cnpj', async () => {
        const producerCreated2 = { ...producerMock, cpfOrCnpj: '12345678901' };
        
        try {
            await service.update(producerCreated2.id, { ...producerMock, cpfOrCnpj: producerCreationMock.cpfOrCnpj });
        } catch (error) {
            expect(error).toHaveProperty('message', 'A producer with this CPF or CNPJ already exists');
        }
    })
});