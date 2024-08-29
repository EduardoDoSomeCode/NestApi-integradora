type MockedMultimediaService = {
    create: jest.Mock<any, any>;
    findAllMultimedia: jest.Mock<any, any>;
    findMultimediaById: jest.Mock<any, any>;
    updateMultimedia: jest.Mock<any, any>;
    deleteMultimedia: jest.Mock<any, any>;
};

export default MockedMultimediaService;