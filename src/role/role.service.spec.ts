import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { createRepositoryRoleMockup } from './repositories/repo.mockup';
import { CreateRoleDto } from './dto/create-role.dto';

describe('RoleService', () => {
  let service: RoleService;

  const mockupRole:CreateRoleDto={name:"admin"};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService,
        {
          provide:getRepositoryToken(Role),
          useValue:createRepositoryRoleMockup
        }

      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it(`sould return 
    {
      id:1,
      name:admin
    }
    `,()=>{
     // expect(service.create(mockupRole)).toEqual();
    })
});
