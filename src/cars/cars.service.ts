import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v7 as uuid } from "uuid";
import { CreateCarDto,UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: "Toyota Prius",
            model: "Prius",
        },
        {
            id: uuid(),
            brand: "Honda Civic",
            model: "Civic",
        },
        {
            id: uuid(),
            brand: "Ford Focus",
            model: "Focus",
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    create( createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(car);
        return car;
    }

    update(id: string, updatecarDto: UpdateCarDto) {
        let carDb = this.findOneById(id);

        if(updatecarDto.id && updatecarDto.id !== id)
            throw new BadRequestException(`id ${updatecarDto.id} is not equal to ${id}`);
        this.cars = this.cars.map( car =>{
            if (car.id === id) {
                carDb = {...carDb,...updatecarDto,id, }
                return carDb;
            }
            return car;
        } );
        return carDb;
    }

    delete(id: string) {
        const car = this.findOneById(id);
        if(car)
            this.cars = this.cars.filter(car => car.id !== id);
    }
}
