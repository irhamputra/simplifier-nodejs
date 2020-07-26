import ResponseModel from '../sampleData/response';
import SuggestLocationModel from '../sampleData/suggestLocation';

export type Response = typeof ResponseModel | typeof SuggestLocationModel;
