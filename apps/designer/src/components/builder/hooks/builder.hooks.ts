import { BuilderState, setBuilderState } from '@/redux/features/builder/builder.slice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useBuilderUtils } from './builder-utils.hooks';

export const useBuilder = () => {
    const dispatch = useDispatch();
    const builderUtils = useBuilderUtils();
    const builderState = useSelector((state: RootState) => state.builder);

    const updateBuilderState = (newState: Partial<BuilderState>) => {
        dispatch(setBuilderState(newState));
    };

    return {
        builderState,
        updateBuilderState,
        builderUtils
    };
};
