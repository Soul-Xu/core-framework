export function reducer(state: any, action: Record<string, any>) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "req":
      return {
        ...state,
        req: { ...state.req, ...action.payload },
      };
    case "reset":
      return state; // Assuming initialState is defined elsewhere
    default:
      return state;
  }
}
