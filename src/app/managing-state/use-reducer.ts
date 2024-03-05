import { Dispatch, useState } from "react";

export interface IReducerAction {
    type: string;
}

export type ReducerType<S, A extends IReducerAction> = (state: S, action: A) => S;
export type ReducerReturnType<S, A extends IReducerAction> = [state: S, dispatch: Dispatch<A>];
export type ReducerDispatchHandler<A extends IReducerAction> = (action: A) => void;

export default function useReducer<S, A extends IReducerAction>(reducer: ReducerType<S, A>, initalState: S = {} as S): ReducerReturnType<S, A> {
    const [state, setState] = useState<S>(initalState);
    const dispatch: ReducerDispatchHandler<A> = action => setState(reducer(state, action));
    return [state, dispatch];
}
