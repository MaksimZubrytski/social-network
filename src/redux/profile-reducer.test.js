import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';


let state = {
    postsData: [
        { id: 1, message: "it's my first post", like: 15 },
        { id: 2, message: "Hello how are you?", like: 18 },
    ],
    profile: null,
    status: "",
}

it('length of post should be incremented', () => {
    let action = addPostActionCreator("Daddy in a house!");

    let newState = profileReducer(state,
         action);

    expect(newState.postsData.length).toBe(3);
})

it('New message post is correct', () => {
    let action = addPostActionCreator("Daddy in a house!");

    let newState = profileReducer(state,
         action);

    expect(newState.postsData[2].message).toBe("Daddy in a house!");
})

it('after deleting lenght should correct', () => {
    let action = deletePost(2);

    let newState = profileReducer(state,
         action);

    expect(newState.postsData.length).toBe(1);
})

it(`after deleting lenght shouldn't be decrement if id is incorrect`, () => {
    let action = deletePost(30);

    let newState = profileReducer(state,
         action);

    expect(newState.postsData.length).toBe(2);
})