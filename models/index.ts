import ResponseModel from './response';
import SuggestLocationModel from './suggestLocation';

export type Response = typeof ResponseModel | typeof SuggestLocationModel;
