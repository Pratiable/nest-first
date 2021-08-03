import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query 
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 컨트롤러의 기본 URL
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll()
    }
    // @Get('search') // :id 부분보다 겟이 밑에있으면 search를 반환하기때문에 항상 :id보다 위에 있어야함
    // search(@Query("title") movieName:string) { // Queryparameter를 받아서 변수에 담음
    //     return `We are searching movie name includes: ${movieName}`
    // }
    
    @Get(':id') // 패스 파라미터
    getOne(@Param('id') movieId: number): Movie { // 패스파라미터를 인자로 받아서 변수에 저장
        return this.moviesService.getOne(movieId)
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.createMovie(movieData)
    }

    @Delete('/:id')
    deleteMovie(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId)
    }

    @Patch('/:id')
    updateMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData)
    }

}
