const sidebarReducer = (state, action) => {
    if (action.type === "TOGGLE_SIDEBAR") {
        return { ...state, isSidebarOpen: !state.isSidebarOpen };
    }
    
    console.warn(`No matching action type: "${action.type}"`);
    return state; // Return current state instead of throwing an error
};

export default sidebarReducer;
