
export const createRepositoryRoleMockup={
    createRoleMockup:jest
    .fn()
    .mockImplementation((name:string)=>{
        return {
            name:name
        }
    }),
    save:jest
    .fn()
    .mockImplementation((name:string)=>{
        Promise.resolve({id:1,name:name})
    })
};