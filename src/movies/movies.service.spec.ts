import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {

    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne', () => {    
    it('should return a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined()
      expect(movie.title).toEqual('Test Movie')
    })

    it('should throw 404 error', () => {
      try{
        service.getOne(1)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie with ID 1 not found. `)
      }
    })
  })
  
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000
      })
      const beforeMovies = service.getAll().length
      service.deleteOne(1)
      const afterDelete = service.getAll().length
      expect(afterDelete).toBeLessThan(beforeMovies)
      
    })
    it('should return 404 error', () => {
      try{
        service.deleteOne(1)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie with ID 1 not found. `)
      }
    })
  })

  describe('createMovie', () => {
    it('create a movie', () => {
      const beforeCreate = service.getAll().length
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000
      })
      const afterCreate = service.getAll().length

      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('updateMovie', () => {
    it('update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000
      });
      service.update(1, {title: 'update Movie'})
      const movie = service.getOne(1)
      expect(movie.title).toEqual('update Movie')
    })

    it('should return 404 error', () => {
      try{
        service.update(84984, {title:'nonononono'})
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

});
