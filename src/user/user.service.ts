import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { ManageError } from 'src/common/errors/custom/custom.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private roleService:RoleService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const role:Role=await this.roleService.findOneByName(createUserDto.roleName);

      const hashedPassword=bcrypt.hashSync(createUserDto.password,10);
      delete createUserDto.roleName;

      createUserDto.password=hashedPassword;

      const dataUser=this.userRepository.create
      ({roleId:role.id,...createUserDto});

      await this.userRepository.save(dataUser);

      return dataUser;
    }catch(err:any){
      if(err.driverError && err.driverError.code=="ER_DUP_ENTRY"){
        throw new ManageError({
          type:"CONFLICT",
          message:"THIS EMAIL ALREADY EXISTS"
        });
      }
      throw ManageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const users:User[] | null= await this.userRepository.find();
      if(users.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT USERS"
        });
      }
      return users;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      console.log("the id is");
      console.log(id);
      
      
      const user:User | null= await this.userRepository.findOneBy({id});
      if(!user){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS ID NOT EXIST"
        });
      }
      return user;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const {affected}=await this.userRepository.update(id,updateUserDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.userRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETED"
        });
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async findUserByRole(role:string){
    try{
      const query= this.userRepository.createQueryBuilder("users");
      const data=await query.innerJoin("roles", "users")
                      .where("roles.name=:role",{role:role})
                      .andWhere("users.roleId = roles.id")
                      .getMany();
      if(data.length){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NO USERS WITH THIS ROLE"
        })
      }
      return data;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async verifyUserByEmailAndPassword(email:string,password:string){
    try{
      const findUser=await this.userRepository.findOneBy({email:email});
    
      if(!findUser || !await bcrypt.compare(password,findUser.password)){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS USER NOT EXIST"
        });
      }
      return findUser;
    }catch(err:any){
  
      throw ManageError.signedError(err.message);
    }
  }

}
