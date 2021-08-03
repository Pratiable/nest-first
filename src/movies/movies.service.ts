import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id) // id를 숫자로 변환
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found. `)
        } else {
            return movie
        }
    }

    deleteOne(id: number) {
        this.getOne(id)
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    createMovie(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length+1,
            ...movieData
        })
        return "SUCCESS"
    }

    update(id:number, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData})
    }
}
